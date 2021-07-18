import './App.css';
import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import CollectionHolder from './components/CollectionHolder';
import ListContext from './components/ListContext';

const apiUrl = process.env.BACKEND_URL;

function App() {
    const [ user, setUser ] = useState(null);
    const [ totalPages, setTotalPages ] = setState(0);
    const [ previousCollectionList, setPreviousCollectionList ] = useState({});
    const [ nextCollectionList, setNextCollectionList ] = useState({});
    const [ listChanged, setListChanged ] = useState(false);
    const [ currentCollectionList, setCurrentCollectionList ] = useState({});

    function loadPage(pageNumber) {
        if(pageNumber === previousCollectionList.pageNumber) {
            setCurrentCollectionList(previousCollectionList);
        } else if(pageNumber === nextCollectionList.pageNumber) {
            setCurrentCollectionList(nextCollectionList);
        }
    }

    const themeValues = {
        user: user,
        setUser: setUser,
        previousCollectionList:previousCollectionList,
        currentCollectionList:currentCollectionList,
        setCurrentCollectionList:setCurrentCollectionList,
        nextCollectionList:nextCollectionList,
        listChanged:listChanged,
        setListChanged:setListChanged.apply
    }

    return (
        <ListContext.Provider value={themeValues}>
            <Grid
            container
            alignContent='center'
            justifyContent='center'
            direction='column'>
                <CollectionHolder />
            </Grid>
        </ListContext.Provider>
    );
}

export default App;