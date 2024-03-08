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
  transition('Home => BibleChallenge', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ right: '-100%'})
    ]),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ right: '100%'}))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({ right: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('BibleChallenge => Home', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '100%'}))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('BibleChallenge=> BibleChallengeVerse', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ right: '-100%'})
    ]),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ right: '100%'}))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({ right: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('BibleChallengeVerse => BibleChallenge', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '100%'}))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('Videos => Video', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ right: '-100%'})
    ]),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ right: '100%'}))
      ], { optional: true }),
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
    ], { optional: true }),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '100%'}))
      ], { optional: true }),
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
    ], { optional: true }),
    query(':enter', [
      style({ right: '-100%'})
    ]),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ right: '100%'}))
      ], { optional: true }),
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
    ], { optional: true }),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '100%'}))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('MonthlyCalendar => TodayCalendar', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ right: '-100%'})
    ]),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ right: '100%'}))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({ right: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('TodayCalendar => MonthlyCalendar', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '100%'}))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('* => Search', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        right: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ right: '-100%'})
    ]),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ right: '100%'}))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({ right: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('Search => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild(),{ optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '100%'}))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('Login => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ],{ optional: true }),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild(),{ optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '100%'}))
      ],{ optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('User => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ],{ optional: true }),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild(),{ optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ left: '100%'}))
      ],{ optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('* => User', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ],{ optional: true }),
    query(':enter', [
      style({ right: '-100%'})
    ]),
    query(':leave', animateChild(),{ optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ right: '100%'}))
      ],{ optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({ right: '0%'}))
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
    query(':leave', animateChild(),{ optional: true }),
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
    query(':leave', animateChild(),{ optional: true }),
    group([
      query(':leave', [animate('300ms ease-out', style({ top: '100%' }))]),
    ]),
    query(':enter', animateChild(),{ optional: true }),
  ]),
  
]);
