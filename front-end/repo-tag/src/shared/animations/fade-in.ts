import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, height: 0 }),
    animate('250ms 100ms ease-in-out', style({ opacity: 1, height: '100%' })),
  ])
]);

