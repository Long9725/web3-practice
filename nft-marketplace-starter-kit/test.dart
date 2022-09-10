import 'dart:async';
import 'dart:mirrors';

@proxy
class AsyncFact implements Future {
  factory AsyncFact() {
    return new AsyncFact._internal(
        new Future.delayed(const Duration(seconds: 1), () => {}));
  }

  AsyncFact._internal(o) : _mirror = reflect(o);

  final InstanceMirror _mirror;
  
  @override
  noSuchMethod(Invocation invocation) => _mirror.delegate(invocation);
}

main() async {
  print(await new AsyncFact());
}
