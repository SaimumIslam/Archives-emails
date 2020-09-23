## My Approach

After reading the instruction carefully, I planned my work. Then, I divided the task into small parts. After completting each parts, I conbine them all to get final result. All my folder structure are given below.

## Technology

**Reactjs, Material-ui**

## File Structure

##### action:

        - Algorithm.js algorith used in application
        - ContextApi.js context api for application

##### components: All usefull components for our app.

    1. common: All common child components.
            - Selected.js selected items
    2. hoc: All higher order component are here.
            - context
                    - EmailsProvider.js
            - AppContext.js Context api provider
            - ErrorBoundary.js Error-Boundary message

    3. list: All child component of List.
            - ListHead.js List header
            - ListItemContent.js List Content
    4. table: All child component of Table.
            - TableHead.js Table header

##### sections: All section of the page.

        - Blank.js show for 0 result
        - List.js  list view
        - Search.js search view
        - Table.js table view

##### data: Static data resources.

        - Resources all resources provided
        - Demo.js all rendom data

##### App.js: All section combined here.

##### Index.js: Root file to load my settings.

## Available Scripts

In the project directory, you can run:

### `npm start`

### `npm run build`
