package me.gabber235.typewriter.entry

import com.google.gson.Gson
import com.google.gson.stream.JsonReader
import me.gabber235.typewriter.entry.entries.AssetEntry
import me.gabber235.typewriter.plugin
import org.koin.core.component.KoinComponent
import org.koin.core.component.inject
import org.koin.core.qualifier.named
import java.io.StringReader

interface AssetStorage {
    fun storeAsset(path: String, content: String)
    fun fetchAsset(path: String): String?
    fun deleteAsset(path: String)

    fun fetchAllAssetPaths(): Set<String>
}

class AssetManager : KoinComponent {
    private val storage: AssetStorage by inject()
    private val stagingManager: StagingManager by inject()
    private val gson: Gson by inject(named("entryParser"))

    fun initialize() {
    }

    private fun removeUnusedAssets() {
        val usedPaths = usedPaths()
        if (usedPaths.isFailure) {
            plugin.logger.severe("Failed to remove unused assets: ${usedPaths.exceptionOrNull()?.message}")
            return
        }

        val unusedPaths = storage.fetchAllAssetPaths().subtract((usedPaths.getOrNull() ?: emptySet()).toSet())
        unusedPaths.forEach {
            storage.deleteAsset(it)
        }
    }

    /**
     * Find all the paths that either have a reference in the database or are in the staging area.
     */
    private fun usedPaths(): Result<Set<String>> {
        val stagingPaths = stagingManager.fetchPages().map { (id, data) ->
            id to JsonReader(StringReader(data.toString()))
        }.mapNotNull { (id, reader) ->
            reader.parsePage(id, gson)
        }.filter {
            it.type == PageType.STATIC
        }.flatMap {
            it.entries
        }.filterIsInstance<AssetEntry>().map {
            it.path
        }.toSet()

        val productionPaths = Query.find<AssetEntry>().map {
            it.path
        }.toSet()

        return Result.success(stagingPaths.union(productionPaths))
    }

    fun storeAsset(entry: AssetEntry, content: String) {
        storage.storeAsset(entry.path, content)
    }

    fun fetchAsset(entry: AssetEntry): String? {
        return storage.fetchAsset(entry.path)
    }

    fun shutdown() {
        removeUnusedAssets()
    }
}

class LocalAssetStorage : AssetStorage {
    override fun storeAsset(path: String, content: String) {
        val file = plugin.dataFolder.resolve("assets/$path")
        file.parentFile.mkdirs()
        file.writeText(content)
    }

    override fun fetchAsset(path: String): String {
        return plugin.dataFolder.resolve("assets/$path").readText()
    }

    override fun deleteAsset(path: String) {
        val asset = plugin.dataFolder.resolve("assets/$path")
        val deletedAsset = plugin.dataFolder.resolve("deleted_assets/$path")
        deletedAsset.parentFile.mkdirs()
        asset.renameTo(deletedAsset)
    }

    override fun fetchAllAssetPaths(): Set<String> {
        return plugin.dataFolder.resolve("assets").walk().filter { it.isFile }
            .map { it.relativeTo(plugin.dataFolder.resolve("assets")).path }.toSet()
    }
}
