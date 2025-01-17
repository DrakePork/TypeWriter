import "dart:async";

import "package:auto_size_text/auto_size_text.dart";
import "package:flutter/material.dart";
import "package:flutter_animate/flutter_animate.dart";
import "package:flutter_hooks/flutter_hooks.dart";
import "package:font_awesome_flutter/font_awesome_flutter.dart";
import "package:freezed_annotation/freezed_annotation.dart";
import "package:hooks_riverpod/hooks_riverpod.dart";
import "package:tinycolor2/tinycolor2.dart";
import "package:typewriter/hooks/text_size.dart";
import "package:typewriter/main.dart";
import "package:typewriter/utils/fonts.dart";
import "package:typewriter/utils/passing_reference.dart";

part "toasts.freezed.dart";

@freezed
class Toast with _$Toast {
  const factory Toast({
    required String id,
    required String message,
    String? description,
    @Default(Colors.blue) Color color,
    @Default(FontAwesomeIcons.exclamation) IconData icon,
    DateTime? shownAt,
  }) = _Toast;

  const factory Toast.temporary({
    required String id,
    required String message,
    String? description,
    @Default(Colors.blue) Color color,
    @Default(FontAwesomeIcons.exclamation) IconData icon,
    @Default(Duration(seconds: 10)) Duration duration,
    DateTime? shownAt,
  }) = TemporaryToast;
}

extension on Toast {
  double get shownPercentage {
    final now = DateTime.now();
    final shownAt = this.shownAt ?? now;
    final difference = now.difference(shownAt);

    return difference.inMilliseconds / 400;
  }

  Color get darkenColor =>
      TinyColor.fromColor(color).shade(50).desaturate(30).color;
}

extension on TemporaryToast {
  double get percentage {
    final now = DateTime.now();
    final shownAt = this.shownAt ?? now;
    final difference = now.difference(shownAt);

    return difference.inMilliseconds / duration.inMilliseconds;
  }
}

class Toasts extends StateNotifier<List<Toast>> {
  Toasts() : super([]) {
    _timer = Timer.periodic(1.seconds, (timer) {
      _checkExpiry();
    });
  }

  late final Timer _timer;

  void show(Toast toast) {
    final now = DateTime.now();
    state = [...state, toast.copyWith(shownAt: now)];
  }

  static void showSuccess(
    PassingRef ref,
    String message, {
    String? description,
    Duration duration = const Duration(seconds: 10),
  }) {
    ref.read(toastsProvider.notifier).show(
          Toast.temporary(
            id: uuid.v4(),
            message: message,
            description: description,
            color: Colors.green,
            icon: FontAwesomeIcons.circleCheck,
            duration: duration,
          ),
        );
  }

  static void showWarning(
    PassingRef ref,
    String message, {
    String? description,
    Duration duration = const Duration(seconds: 10),
  }) {
    ref.read(toastsProvider.notifier).show(
          Toast.temporary(
            id: uuid.v4(),
            message: message,
            description: description,
            color: Colors.orange,
            icon: FontAwesomeIcons.circleExclamation,
            duration: duration,
          ),
        );
  }

  static void showError(
    PassingRef ref,
    String message, {
    String? description,
    Duration duration = const Duration(seconds: 10),
  }) {
    ref.read(toastsProvider.notifier).show(
          Toast.temporary(
            id: uuid.v4(),
            message: message,
            description: description,
            color: Colors.red,
            icon: FontAwesomeIcons.triangleExclamation,
            duration: duration,
          ),
        );
  }

  void hide(Toast toast) {
    state = state.where((t) => t != toast).toList();
  }

  void _checkExpiry() {
    final now = DateTime.now();
    final expired = state.where((toast) {
      if (toast is TemporaryToast) {
        final shownAt = toast.shownAt ?? now;
        final duration = toast.duration;
        final difference = now.difference(shownAt);

        return difference > duration;
      } else {
        return false;
      }
    }).toList();
    if (expired.isEmpty) return;
    state = state.where((toast) => !expired.contains(toast)).toList();
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }
}

final toastsProvider = StateNotifierProvider<Toasts, List<Toast>>(
  (ref) => Toasts(),
  name: "toastsProvider",
);

@immutable
class ToastDisplay extends HookConsumerWidget {
  const ToastDisplay({
    this.child,
    super.key,
  });

  final Widget? child;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final toasts = ref.watch(toastsProvider);
    return Stack(
      children: [
        if (child != null) child!,
        Positioned(
          top: 0,
          right: 4,
          bottom: 0,
          child: SingleChildScrollView(
            child: Column(
              children: [
                for (final toast in toasts)
                  if (toast is TemporaryToast)
                    _ToastShowAnimation(
                      toast: toast,
                      child: _TemporaryToast(toast: toast),
                    )
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _ToastShowAnimation extends HookConsumerWidget {
  const _ToastShowAnimation({
    required this.child,
    required this.toast,
  });

  final Widget child;
  final Toast toast;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final controller = useAnimationController(duration: 400.ms);

    useEffect(() {
      controller.forward(from: toast.shownPercentage);
      return null;
    });

    return child
        .animate(
          key: ValueKey(toast.id),
          controller: controller,
          autoPlay: false,
        )
        .scaleXY(begin: 0.7, duration: 400.ms, curve: Curves.elasticOut)
        .moveX(begin: -100, duration: 400.ms, curve: Curves.elasticOut)
        .fadeIn(duration: 200.ms, curve: Curves.easeIn);
  }
}

class _TemporaryToast extends HookConsumerWidget {
  const _TemporaryToast({
    required this.toast,
  });

  final TemporaryToast toast;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final controller = useAnimationController(duration: toast.duration);

    useEffect(() {
      controller.forward(from: toast.percentage);
      return null;
    });

    final messageSize = useTextSize(
      context,
      toast.message,
      const TextStyle(
        color: Colors.white,
        fontSize: 16.0,
        fontVariations: [extraBoldWeight],
      ),
    );

    final width = messageSize.width + 28 + 12 + 12 + 16;

    return Card(
      color: toast.color,
      elevation: 4.0,
      child: SizedBox(
        width: width,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _TemporaryToastProgress(toast: toast, width: width),
            Padding(
              padding:
                  const EdgeInsets.only(top: 8, bottom: 8, left: 12, right: 16),
              child: Row(
                children: [
                  Icon(
                    toast.icon,
                    color: toast.darkenColor,
                    size: 28.0,
                  ),
                  const SizedBox(width: 12.0),
                  Flexible(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          toast.message,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 16.0,
                            fontVariations: [extraBoldWeight],
                          ),
                        ),
                        if (toast.description != null) ...[
                          const SizedBox(height: 4.0),
                          AutoSizeText(
                            minFontSize: 10,
                            toast.description!,
                            style: TextStyle(
                              color: toast.darkenColor,
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    )
        .animate(
          key: ValueKey(toast.id),
          autoPlay: false,
          controller: controller,
        )
        .fadeOut(
          delay: toast.duration - 200.ms,
          duration: 200.ms,
          curve: Curves.easeOut,
        );
  }
}

class _TemporaryToastProgress extends HookConsumerWidget {
  const _TemporaryToastProgress({
    required this.toast,
    required this.width,
  });

  final TemporaryToast toast;
  final double width;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final controller =
        useAnimationController(duration: toast.duration - 200.ms);

    useEffect(() {
      controller.forward(from: toast.percentage);
      return null;
    });

    useAnimation(controller);

    return Container(
      width: width * (1 - controller.value),
      height: 4.0,
      decoration: BoxDecoration(
        color: toast.darkenColor,
        borderRadius: BorderRadius.circular(2.0),
      ),
    );
  }
}
