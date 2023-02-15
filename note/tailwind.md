## tailwindcss in next

1. 初始化tailwindcss

```shell
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p\
```


2. 添加文件tailwindcss in 
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```


3. 添加tailwind  css 在项目中的根css文件添加
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

然后就可以快乐的玩耍了


常用taiwind类
```css


```

