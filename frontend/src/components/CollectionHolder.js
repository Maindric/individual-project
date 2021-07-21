// import { useEffect } from 'react';
import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Dialog, Paper, Typography, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, MenuItem, ThemeProvider, makeStyles, Icon } from "@material-ui/core";
import { useEffect, useContext, useState } from "react";
import clsx from 'clsx';
import ListContext from "./ListContext";
import {Add} from "@material-ui/icons"

const paperStyle = {
    width: '80vw',
    maxWidth: '80vw',
    display: 'flex',
    direction: 'row',
    flexWrap: "wrap"
};

const titleStyle = {
    position: 'relative',
    top: '-64px',
    padding: '0px 1.25%',
    backgroundColor: '#ffffffd0',
    borderRadius: '0px',
    minWidth: '100%',
    maxWidth: '100%',
    alignContent: 'center',
}

const addInfo = {
    position: 'relative',
    top:'calc(100% - 64px)',
    left: '0',
    width:'100%',
    height: '64px',
    display: 'flex',
    direction: 'row',
    justifyContent:'space-between',
}

const inputStyles = makeStyles((theme) => ({
    columns: {
        // margin: theme.spacing(1),
        width: '30%'
    }
}))

function CollectionHolder() {
    const itemDefault = {
        id: -1,
        format: 'DVD', 
        interest:'Interested',
        title: '',
        image: '',
        volume: 0
    }
    const styles = inputStyles();
    const context = useContext(ListContext);
    const [open, setOpen] = useState(false);
    const [formDetails, setFormDetails] = useState(itemDefault)
    const [posts, setPosts] = useState([]);

    useEffect(_ => {
        if(context.currentCollectionList) {
            setPosts(context.currentCollectionList.collection)
            console.log("Posts set", context.currentCollectionList.collection);
        }
    }, [context.listChanged])

    function cardClick(item) {
        setOpen(true);
        setFormDetails({
            id: item.id,
            format: item.format, 
            interest: item.interest,
            title: item.title,
            image: item.image,
            volume: item.volume
        })
    }

    function submitItem() {
        if(formDetails.id !== -1) {
            const sendObject = {};
            const item = context.currentCollectionList.collection.filter(item => item.id === formDetails.id)[0];
            Object.keys(formDetails).forEach(key => {
                if(key !== 'id' && item[key] !== formDetails[key]) {
                    sendObject[key] = formDetails[key];
                    item[key] = formDetails[key];
                }
            });
            fetch(`${context.apiUrl}/update/${formDetails.id}`, {
                method: 'PATCH',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sendObject)
            })
        } else {
            fetch(`${context.apiUrl}/new`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDetails)
            })
        }
        context.setListChanged(!context.listChanged);
        let timeout = setTimeout(_ => {
            context.setCurrentPage(`${context.currentPage}`);
            clearTimeout(timeout)
        }, 5000)
        handleClose();
    }

    function deleteItem() {
        fetch(`${context.apiUrl}/delete/${formDetails.id}`, {
            method: 'DELETE',
            body: {}
            // mode: 'cors',
            // headers: {
            //     'Content-Type': 'application/json'
            // }
        })
        context.setListChanged(!context.listChanged);
        context.setCurrentPage(context.currentPage);
        context.setCurrentCollectionList({...context.currentCollectionList, collection: context.currentCollectionList.collection.filter(item => item.id !== formDetails.id)});
        handleClose();
    }

    function renderCards() {        
        function mediaIcon(item) {
            let icon = '';
            switch(item.format) {
                case 'BD':
                    icon = 'icons/BD.png';
                    break;
                case '4k':
                    icon = 'icons/UHD.png';
                    break;
                case 'DVD':
                    icon = 'icons/DVD.png';
                    break;
                case 'Manga':
                    icon = 'icons/Manga.png';
                    break;
                case 'Comic':
                    icon = 'icons/Comic.png';
                    break;
                case 'Book':
                    icon = 'icons/Book.png';
                    break;
            }
            const volume = item.volume === 0 ? "" : <Typography variant='h6' style={{position:'relative', backgroundColor:'#ffffffba', height:'32px', padding: '0 2px', borderRadius:'5px', left:'2px', top:'16px'}}> Volume: {item.volume} </Typography>;
            return (
                <Typography style={addInfo}>
                    <div>{volume}</div>
                    <CardMedia style={{width:64, position: 'relative',}} component='img' src={icon} />
                </Typography>
            )
        }
        if(posts) {
            return posts.map(post=> {
                console.log("Rendering", post);
                const width = '19vw';
                const heightScale = 1.4;
                const height = `calc(${width} * ${heightScale})`;
                const collectionItemStyle = {
                    width: width,
                    minWidth: width,
                    height: `${height}`,
                    maxHeight: `${height}`,
                    margin: '.5vw .5vw',
                    backgroundImage: `url(${post.image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '0.0 center',
                    backgroundSize: `calc(${width} + 1px) calc(${width} * ${heightScale + 0.01})`
                };


                return (
                    <Card 
                    border='4'
                    borderColor='#000000' raised={true} style = {collectionItemStyle} >
                        <CardActionArea onClick={_ => cardClick(post)}>
                            <Typography style={{height:height}}>
                                {mediaIcon(post)}
                                <CardHeader style={titleStyle} disableTypography={true} 
                                    title={<Typography style={{textAlign:'center'}} variant='body1'>{post.title}</Typography>} variant='h6' />
                            </Typography>
                        </CardActionArea>
                    </Card>
                )
            })
        }
        // If no posts to render.
        return <></>
    }

    function handleClose() {
        setOpen(false);
    }

    const formats = [
        {
            value: '4k',
            label: '4k Ultra HD'
        },
        {
            value: 'BD',
            label: 'Blu-ray'
        },
        {
            value: 'Book',
            label: 'Book'
        },
        {
            value: 'Comic',
            label: 'Comic'
        },
        {
            value: 'DVD',
            label: 'DVD'
        },
        {
            value: 'Manga',
            label: 'Manga'
        }
    ]

    const interests = [
        {
            value: 'Interested',
            label: 'Interested'
        },
        {
            value: 'Owned',
            label: 'Owned'
        },
        {
            value: 'Want',
            label: 'Want'
        }
    ]

    return (
        <>
            <Paper style={paperStyle} children={renderCards()} />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Edit Entry</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText> */}
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="title"
                        label="Title"
                        value={formDetails.title}
                        onChange={e => setFormDetails({...formDetails, title: e.target.value})}
                        fullWidth
                    />
                    <Typography style={{display:'flex', justifyContent:'space-between'}}>
                        <TextField
                            id="format"
                            select
                            className={clsx(styles.columns)}
                            margin="dense"
                            label="Format"
                            value={formDetails.format}
                            onChange={e => setFormDetails({...formDetails, format: e.target.value})}
                        >
                            {formats.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="interest"
                            select
                            className={clsx(styles.columns)}
                            margin="dense"
                            label="Interest"
                            value={formDetails.interest}
                            onChange={e => setFormDetails({...formDetails, interest: e.target.value})}
                        >
                            {interests.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            required
                            className={clsx(styles.columns)}
                            defaultValue="0"
                            margin="dense"
                            id="volume"
                            label="Volume"
                            type="number"
                            value={formDetails.volume}
                            onChange={e => setFormDetails({...formDetails, volume: e.target.value})}
                        />
                    </Typography>
                    <TextField
                        required
                        defaultValue=""
                        margin="dense"
                        id="image"
                        label="Image Link"
                        helperText="Submit a URL to the image."
                        value={formDetails.image}
                        onChange={e => setFormDetails({...formDetails, image: e.target.value})}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {formDetails.id > -1 ?
                        (<Button onClick={deleteItem} color="primary">
                            Delete
                        </Button>) : <></>}
                    <Button onClick={submitItem} color="primary">
                        {formDetails.id === -1 ? 'Add' : 'Edit'}
                    </Button>
                </DialogActions>
            </Dialog>
            <Button style={{position:'fixed', top:'calc(100vh - 96px)', left:'calc(100vw - 96px)', width:'48px', minWidth:'48px', height:'48px', minHeight:'48px'}} variant='outlined' color='primary' onClick={_ => cardClick(itemDefault)}>
                <Add color="primary" />
            </Button>
        </>
    );
}

export default CollectionHolder;