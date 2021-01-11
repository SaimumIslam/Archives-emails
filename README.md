# Archives-emails
Responsive archieve emails for admin

## Screenshot

![blank](https://user-images.githubusercontent.com/25328307/94724061-81e41000-037b-11eb-98ad-9601da2046e2.PNG)
![desktop](https://user-images.githubusercontent.com/25328307/94724068-83add380-037b-11eb-8e2e-02522fe2f151.PNG)
![mobile](https://user-images.githubusercontent.com/25328307/94724066-83153d00-037b-11eb-9ef8-eec55cae66c8.PNG)


## Technology

**Reactjs, Material-ui**

## File Structure

##### action: all actions for our app.
   - Algorithm.js
   - ContextApi.js

##### components: all usefull components for our app.

1. common: all common child components.
    - Selected.js
2. hoc: all higher order component are here.
    - context
        - EmailsProvider.js
    - AppContext.js
    - ErrorBoundary.js

3. list: all child component of List.
     - ListHead.js
     - ListItemContent.js
4. table: all child component of Table.
     - TableHead.js

##### sections: all section of the page.
   - Blank.js
   - List.js
   - Search.js
   - Table.js

##### data: static data resources.

   - Resources
   - Demo.js (all rendom data)

##### App.js: all section combined here.

##### Index.js: root file to load my settings.

## Available Scripts

In the project directory, you can run:

### `npm start`

### `npm run build`

