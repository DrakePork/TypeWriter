package com.caleb.typewriter.superiorskyblock.entries.action

import com.bgsoftware.superiorskyblock.api.SuperiorSkyblockAPI
import com.caleb.typewriter.superiorskyblock.SuperiorSkyblockAdapter
import me.gabber235.typewriter.adapters.Colors
import me.gabber235.typewriter.adapters.Entry
import me.gabber235.typewriter.entry.Criteria
import me.gabber235.typewriter.entry.Modifier
import me.gabber235.typewriter.entry.entries.ActionEntry
import me.gabber235.typewriter.utils.Icons
import org.bukkit.block.Biome
import org.bukkit.entity.Player

@Entry("superiorskyblock_island_set_border_size", "[SuperiorSkyblock] Set a player's island's border size", Colors.RED, Icons.BORDER_ALL)
data class IslandSetBorderSizeActionEntry(
    override val id: String = "",
    override val name: String = "",
    override val criteria: List<Criteria> = emptyList(),
    override val modifiers: List<Modifier> = emptyList(),
    override val triggers: List<String> = emptyList(),
    val size: Int = 0

) : ActionEntry {

    override fun execute(player: Player) {
        super.execute(player)

        var sPlayer = SuperiorSkyblockAPI.getPlayer(player)
        var island = sPlayer.getIsland()
        island?.islandSize = size

    }

}