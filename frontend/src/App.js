import './App.css';
import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import CollectionHolder from './components/CollectionHolder';
import ListContext from './components/ListContext';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
    const [ user, setUser ] = useState(null);
    const [ totalPages, setTotalPages ] = useState(1);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ currentCollectionList, setCurrentCollectionList ] = useState({pageNumber: 0});
    const [ listChanged, setListChanged ] = useState(false);

    useEffect(_ => {
        let isMounted = true;
        
        if(typeof currentPage === 'number') {
            if(currentPage < 1) {
                setCurrentPage(1);
            } else if(currentPage > totalPages) {
                setCurrentPage(totalPages);
            } else {
                const url = `${apiUrl}/collection/${currentPage}`;
                console.log("Loading Page", currentPage);

                fetch(url)
                    .then(data => data.json())
                    .then(json => {
                        if(!isMounted) {
                            return null;
                        }
                        console.log("Current list changing");
                        setCurrentCollectionList(old => json.currentPage);
                        console.log("Total pages changing");
                        setTotalPages(json.totalPages);
                        console.log("Flipping dirty flag");
                        setListChanged(old => !listChanged);
                    })
                return () => {
                    console.log("Dismounting");
                    isMounted = false;
                };
            }
        } else {
            setCurrentPage(Number(currentPage));
        }
    }, [currentPage]);

    const themeValues = {
        user: user,
        setUser: setUser,
        currentCollectionList:currentCollectionList,
        setCurrentCollectionList:setCurrentCollectionList,
        listChanged:listChanged,
        currentPage:currentPage,
        setCurrentPage:setCurrentPage,
        setListChanged:setListChanged,
        apiUrl: apiUrl
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