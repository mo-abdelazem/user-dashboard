import { trigger, style, transition, animate } from '@angular/animations';

// Fade-in animation
export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    // When the element is added to the DOM
    style({ opacity: 0 }), // Start with opacity 0
    animate('1s ease-in', style({ opacity: 1 })), // Gradually increase opacity
  ]),
]);
export const bounceAnimation = trigger('bounce', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }), // Start above the viewport
    animate('0.5s ease-out', style({ transform: 'translateY(0)' })), // Bounce down
    animate('0.2s ease-in', style({ transform: 'translateY(-10%)' })),
    animate('0.1s ease-out', style({ transform: 'translateY(0)' })),
  ]),
]);
