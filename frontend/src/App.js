import './App.css';
import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import CollectionHolder from './components/CollectionHolder';
import ListContext from './components/ListContext';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
    const [ user, setUser ] = useState(null);
    const [ totalPages, setTotalPages ] = useState(0);
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

    useEffect(_ => {
        console.log("Backend URL:", apiUrl);
        fetch(`${apiUrl}/collection`)
            .then(data => data.json())
            .then(json => console.log(json))
            .catch(e => console.log('ERROR!!'));
    })

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