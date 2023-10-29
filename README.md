# Billboard React
### Wep Component written with React js

## JSX

```jsx

import Billboard from "./Components/Billboard/Billboard";

function App() {
return (
    <div className="App">
        <Billboard clones={32} hover={true} rate={.5} direction='right'>
            <h5>React Component: Billboard</h5>
        </Billboard>
    </div>
    );
}
```

## Props

```typescript
interface Props {
    rate: Number;
    direction: 'right' | 'left';
    clones: Number;
    hover: boolean
}
```

