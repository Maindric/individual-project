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



    const themeValues = {
        user: user,
        setUser: setUser,
        previousCollectionList:previousCollectionList,
        setPreviousCollectionList:setPreviousCollectionList,
        currentCollectionList:currentCollectionList,
        setCurrentCollectionList:setCurrentCollectionList,
        nextCollectionList:nextCollectionList,
        setNextCollectionList:setNextCollectionList,
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