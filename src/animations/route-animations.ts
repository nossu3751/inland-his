import {
  trigger,
  transition,
  style,
  query,
  animateChild,
  group,
  animate,
} from '@angular/animations';


export const routeAnimation = 
trigger('routeAnimations', [
  transition('Videos => Video', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ right: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ right: '100%'}))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ right: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('Video => Videos', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '100%'}))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('Bulletins => Bulletin', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ right: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ right: '100%'}))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ right: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('Bulletin => Bulletins', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '100%'}))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('Home => Search', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ right: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ right: '100%'}))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ right: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('Search => Home', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '100%'}))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('Search => Video', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ right: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ right: '100%'}))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ right: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('Video => Search', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '100%'}))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('Search => Bulletin', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ right: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ right: '100%'}))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ right: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('Bulletin => Search', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '100%'}))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('Search => SmallGroupNote', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ right: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ right: '100%'}))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ right: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('SmallGroupNote => Search', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '100%'}))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
]);

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
