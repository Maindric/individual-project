// import { useEffect } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const paperStyle = {
    width: '80vw',
    maxWidth: '80vw',
    display: 'flex',
    direction: 'row'
};



function CollectionHolder() {
    const posts = ["This is card 1", "This is card 2", "This is card 3", "This is card 4"];

    function getPosts(posts) {
        return posts.map(post=> {
            const width = '19vw';
            const heightScale = 1.4;
            const collectionItemStyle = {
                width: width,
                minWidth: width,
                height: `calc(${width} * ${heightScale})`,
                maxHeight: `calc(${width} * ${heightScale})`,
                margin: '.5vh .5vw',
                backgroundImage: `url(https://fanart.tv/fanart/tv/299963/tvposter/dimension-w-56acaf9a83dc1.jpg)`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '0.0 center',
                backgroundSize: `${width} calc(${width} * ${heightScale + 0.01})`
            };
            return (
            <Card raised={true} style = {collectionItemStyle} >
                <CardActionArea style = {{height:`calc(${width} * ${heightScale})`}}>
                    <CardContent>
                        {post}
                    </CardContent>
                </CardActionArea>
            </Card>
            )
        })
    }

    return (
        <Paper style={paperStyle} children={getPosts(posts)} />
    );
}

export default CollectionHolder;