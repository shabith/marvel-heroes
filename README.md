# Marvel Heroes

Marvel Heroes is a react native application built with Marvel Developer API.

see it in action:

[Android](https://gfycat.com/faithfuladeptafricanwilddog)

[IOS](https://gfycat.com/contentbriskfirebelliedtoad)

## Features

1. **Infinite scroll pagination** - the app will load 20 heroes each time.
2. **Hero filtering capability** - you can filter already loaded heroes by name, using search.
3. **Latest comics** - Character's latest 10 comics will be available with images, prices, and links to buy.
4. **Appearance in last decade** - A graph showing characters number of appearance in last decade.

## How to build/run

1. Clone the repository and run `yarn` or `npm install`.
2. Register as a Marvel Developer and get a **Public** key and **Private** Key.
3. Duplicate `.env.sample` as `.env` file and put Public and Private key in the relevant places.
4. Run `yarn ios` or `npm ios` to run it in **IOS Simulator** or if you prefer android you can run `yarn android` or `npm android` to run it in **Android Simulator**

## Knowing issues

1. In the [chart package](https://github.com/indiespirit/react-native-chart-kit), there is a knowing bug when we have a low number of data. Due to that, we can see duplicate y-axis labels.
