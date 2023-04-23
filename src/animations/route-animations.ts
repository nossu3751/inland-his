import {
  trigger,
  transition,
  style,
  query,
  animateChild,
  group,
  animate,
} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('* => NewComer', [
    style({ position: 'relative' }),
    query(':enter', [
      style({
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        height: '100%',
      }),
    ]),
    query(':leave', animateChild()),
    group([
      query(':enter', [animate('300ms ease-out', style({ top: '0%' }))]),
    ]),
    query(':enter', animateChild()),
  ]),
  transition('NewComer => *', [
    style({ position: 'relative' }),
    query(':enter', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }),
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('300ms ease-out', style({ top: '100%' }))]),
    ]),
    query(':enter', animateChild()),
  ]),
]);
