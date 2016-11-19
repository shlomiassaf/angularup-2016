import {
  Component,
  ViewChild,
  ViewContainerRef,
  Compiler,
  Injector,
  NgModuleRef,
  NgModuleFactory,
  ComponentFactoryResolver,
  ComponentRef
} from '@angular/core';

import { RuntimeCompiledModule, RuntimeCompiledComponent } from './runtime-compiled';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('vcRef', {read: ViewContainerRef}) vcRef: ViewContainerRef;
  private cmpRefs: ComponentRef<RuntimeCompiledComponent>[] = [];

  constructor(private compiler: Compiler, private injector: Injector) {
  }

  add(): void {
    const moduleFactory: NgModuleFactory<RuntimeCompiledModule> = this.compiler.compileModuleSync(RuntimeCompiledModule);
    const moduleRef: NgModuleRef<RuntimeCompiledModule> = moduleFactory.create(this.injector);

    const injector = moduleRef.injector;


    const cmpRef = this.vcRef.createComponent<RuntimeCompiledComponent>(
      injector.get(ComponentFactoryResolver).resolveComponentFactory(RuntimeCompiledComponent),
      this.vcRef.length,
      injector);

    this.cmpRefs.push(cmpRef);
  }

  kill(): void {
    const cmpRef = this.cmpRefs.pop();
    if (cmpRef) {
      cmpRef.destroy();
    }
  }
}
