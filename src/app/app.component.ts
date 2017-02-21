import {
  Component, Directive, HostBinding, HostListener,
  Input, Injectable, ViewChild, ViewContainerRef, ElementRef, TemplateRef
} from '@angular/core';
//HostBinding
@Directive({
  selector: '[first]'
})
export class FirstDirective{
  @Input() first
  @HostBinding() innerText = "I am HostBinding"
}

@Injectable()
export class OnlineService{
  online = true
  constructor() {
    setInterval(()=>{
      this.online = Math.random() > .5
    }, 1000)
  }
}

@Directive({
  selector: '[online]'
})
export class OnlineDirective{
  @HostBinding('disabled') get disabled() {
    return this.online.online
}
  @HostBinding('class.offline') get offline() {
    return this.online.online
  }
constructor(private online:OnlineService){}

}



@Injectable()
export class TrackingService{
  logs = []
  log(trackingEvent) {
    this.logs.push(trackingEvent)
    console.log(this.logs)
  }
}

//HostListener
@Directive({
  selector: '[track]'
})
export class SecondDirective{
  @Input() track

  @HostListener('click') onClick() {
    this.tracking.log({event:'click', message:this.track})
  }
  constructor(private tracking:TrackingService ){}
}



//@Input
@Component({
  selector: 'basic',
  template: `
<div>{{message}}</div>

<br>
<template #foo>
<h3>This is content from a template (ViewChild, ViewContainerRef)</h3>
</template>

`
})
export class BasicComponent{
  @Input() message
  @ViewChild('foo') template
  constructor(private view: ViewContainerRef){}
  ngAfterContentInit(){
    this.view.createEmbeddedView(this.template)
  }
}

//Structural Directive
@Directive({
  selector: '[three]'
})
export class ThreeDirective{
  @Input() set threeFrom({one, two, three}){
    this.view.createEmbeddedView(this.template,{
      $implicit: one})
    this.view.createEmbeddedView(this.template,{
      $implicit: two})
    this.view.createEmbeddedView(this.template,{
    $implicit: three})
    }

  constructor(el:ElementRef,
  private view:ViewContainerRef,
  private template: TemplateRef<any>) {
    console.log(el.nativeElement)
  }

}


@Component({
  selector: 'app-root',
  template: `
<h1>HostBinding</h1>
<h1 [first]="'I will be replaced'"></h1>


<hr>
<h1>HostListener</h1>
<button online [track]="'One Button'">One</button>
<button [track]="'Two Button'">Two</button>
<button [track]="'Three Button'">Three</button>
<hr>

<h1>Bsic Component in App Component</h1>
<div>@Input message passed from App Component</div>
<basic [message]="'I am a message from App Component'"></basic>
<hr>

<h1>ngTempalteOutlet / ngOutletContext</h1>
<template #haha let-message="message">
{{message}}
</template>

<div 
[ngTemplateOutlet]="haha"
[ngOutletContext]="one"
></div>
<div 
[ngTemplateOutlet]="haha"
[ngOutletContext]="two"
></div>
<hr>

<h1 *three="let message from structMessages">I am {{message}} structural directive</h1>

<hr>
<h1>My First Attribute Directive</h1>

<h4>Pick a highlight color</h4>
<div>
  <input type="radio" name="colors" (click)="color='lightgreen'">Green
  <input type="radio" name="colors" (click)="color='yellow'">Yellow
  <input type="radio" name="colors" (click)="color='cyan'">Cyan
</div>
<p [myHighlight]="color" >Highlight me!</p>

<p [myHighlight]="color" defaultColor="violet">
  Highlight me too!
</p>
`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  color: string;
  one = {message: 'Hello One'}
  two = {message: 'Hello Two'}
  structMessages = {
    one: 'First',
    two: 'Second',
    three: 'Third'
  }
}
