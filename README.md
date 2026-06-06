# Frontend Mentor - REST Countries API with color theme switcher solution

This is my solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [The State Matrix & Architecture](#the-state-matrix--architecture)
  - [Combined Matrix Filtering Logic](#combined-matrix-filtering-logic)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

My goal was to integrate the REST Countries API to pull country data and display it in a clean, searchable, and filterable interface, complete with a fully functional Dark/Light mode toggle.

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode 

Functionality:
- Dynamic API data fetching and state management.
- Real-time search filtering and region dropdown matrix.
- Full Dark/Light theme state persistence.
- Responsive grid design (Mobile-first).

### Screenshot

![Screenshot](./public/Screenshot.png)

### Links

- Solution URL: [Github Link](https://github.com/Saliva-sys/rest-countries-api.git)
- Live Site URL: [Github Pages](https://saliva-sys.github.io/rest-countries-api/)
- Live Site URL: [Netlify](https://rest-countries-api-saliva.netlify.app/)
- Live Site URL: [Vercel](https://rest-countries-api-sigma-nine.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- Mobile-first, component-based workflow
- Flexbox & CSS Grid for fluid element alignment
- [React 18](https://react.dev/) - UI library for reactive state management
- [Vite](https://vitejs.dev/) - Frontend building tool
- TypeScript - For rigorous contract checking, strict interface definitions, and data reliability
- Tailwind CSS - Advanced utility-first framework for atomic layout rendering and responsive breakpoint definitions
- React Icons - For lightweight vector UI markers (`FaMoon`, `FaSearch`, etc.)

### The State Matrix & Architecture

To achieve industry-grade standards, the application handles complex interconnected states. Instead of fetching or filtering separate arrays individually, a single data pipeline controls the interface through logical combination matrixes.

*Key implementations include:*

- **Double-Gate Filter Pipeline:** The main repository dashboard runs a dual check. Search input modifications and dropdown selection states filter the original source data simultaneously without re-renders colliding or wiping history.
- **Strict Data Contracts:** Using a dedicated `Countries` type definition maps the complex JSON layout seamlessly, ensuring that optional keys (such as `currencies`, `capital`, or `borders`) do not trigger execution faults.
- **Dynamic CSS State Bindings:** Component color maps are isolated into strict functional style objects, keeping components fully uncoupled from hardcoded themes and leveraging Tailwind's runtime reactivity.

#### Combined Matrix Filtering Logic:

```typescript
const filteredCountries = countries.filter(country => {
    const matchesName = country.name.toLowerCase().includes(searchValue.toLowerCase());
    const matchesRegion = activeRegion === "" || country.region === activeRegion;

    return matchesName && matchesRegion;
});
```

### What I learned

This project refined my understanding of route-driven rendering, strict optional data handling in TypeScript, and synchronized viewport interactions between mobile and desktop structures.

*1. Combined Predicate Arrays for Dynamic Search*

I practiced crafting predictable data views where multi-variable configurations determine layout output. This completely removed the need for keeping duplicate mutated lists in separate hooks.

*2. Safely Extracting deeply nested relational properties*

I learned how to safely typecast static data schemas using as Countries[], and mapping dynamic string references into structured country name definitions by executing safe arrays fallback operators (??).

```typescript
const borderCountries = borders?.map(border => {
    const country = (data as Countries[]).find(item => item.alpha3Code === border);
    return country ? country.name : border;
})
```

*3. Decoupling Global Theme Injection from Component Contexts*

I practiced managing pure CSS side-effects using an isolated useEffect hook. Directly injecting classes into document.body keeps the app layout lightweight and ensures background transitions run smoothly without forcing deep React tree component updates.

```typescript
useEffect (() => {
    if (darkMode) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}, [darkMode]);
```
*4. Auto-Suggestion Sliders & Input Focus Catchers*

I implemented a robust auto-suggestion component using substring queries (startsWith). Combining this with focus catching hooks creates a highly responsive, app-like search experience.

```typescript
const suggestions = (searchValue.trim().length > 0 && allCountries) 
    ? allCountries.filter(country => {
        const matchesName = country.name.toLowerCase().startsWith(searchValue.toLowerCase())
        const matchesRegion = activeRegion ? country.region === activeRegion : true;

        return matchesName && matchesRegion;
    }).slice(0, 10) : [];
```

### Continued development

In upcoming iterations, I plan to focus on:
- Route Navigation Bindings for Border Countries: Turning standard border country indicator badges into full Link components to allow organic site navigation directly through adjacent countries.
- Client-Side Optimization (Debouncing): Implementing a custom debounce wrapper on input changes to handle high-frequency keyword filtering with higher UI efficiency.
- Localized State Caching: Storing the current theme configuration inside localStorage to persist dark/light properties on active page refreshes.

### Useful resources

- [React Router Documentation](https://reactrouter.com/) - This helped me understand dynamic routing and how to catch the `:alpha3Code` parameter cleanly using the `useParams` hook.
- [Tailwind CSS - Dark Mode Guide](https://tailwindcss.com/docs/dark-mode) - A great reference for managing themes dynamically. It guided me on how to hook the theme toggle into the document body class list.
- [MDN Web Docs - Array.prototype.startsWith()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith) - Essential for implementing the substring search logic inside my custom auto-suggestion filter.

### AI Collaboration

This project was built using a supportive, iterative pair-programming framework alongside an AI assistant.

How do I use it?

- Composition & Presentation Engineering: The AI partner provided valuable design guidance within Figma workflows, helping conceptualize depth configurations, spatial balance, and the correct structural values for high-fidelity soft dymic shadows (Layer Blur configurations) to produce an authentic portfolio presentation mockup.

- Conditional Layout Debugging: Together we refined flexible text-width behaviors inside the border country rows, ensuring long country strings gracefully toggle between explicit word-truncation or dynamic inline size expansions depending on string arrays length checks.

What worked well?

- Rapid Prototyping: Explaining the desired filtering behavior (sharing search and region values simultaneously) allowed us to quickly move away from messy, bug-prone state configurations straight to a clean, single-pass .filter() solution.

What didn't work well?

- Visual Asset Context: Since AI works strictly through text and file data, it cannot perceive real-time visual balance shifts or exact device positions inside layouts. Fine-tuning the exact positioning of pixel layouts, shadow overlaps, and responsive tailwind alignment breakpoints required my own manual verification and browser DevTools debugging. This push was beneficial, forcing me to dive deep into mobile-first layout logic and maintain full creative control over the aesthetic result.

## Author

- Frontend Mentor - [@Saliva-sys](https://www.frontendmentor.io/profile/Saliva-sys)
- GitHub - [Saliva-sys](https://github.com/Saliva-sys)
- Netlify - [Saliva-sys Profile](https://app.netlify.com/teams/saliva-sys) 
- Vercel - [Saliva-sys Profile](https://vercel.com/saliva-sys-projects)

## Acknowledgments

Huge thanks to the Frontend Mentor platform for providing high-quality design files and rigorous operational requirements that simulate real-world developer specifications.