# Donn's Collection

## Backend

### Create / Post

``` https://donns-collection-api.herokuapp.com/new ```

Will add contents of body to collection, body should have the following:
```json
{
    title: STRING,
    format: STRING,
    volume: INTEGER,
    interest: STRING,
    image: STRING
}
```

### Read / Get

#### All

```
https://donns-collection-api.herokuapp.com/collection
```

Returns a modest array of collection objects.  Will return the entire collection.

```json
[
    {
        id: 2,
        title: "Dimension W",
        format: "BD",
        volume: 0,
        interest: "Owned",
        image: "https://fanart.tv/fanart/tv/299963/tvposter/dimension-w-56acaf9a83dc1.jpg",
        created_at: "2021-07-20T21:19:08.979Z",
        updated_at: "2021-07-20T21:19:08.979Z"
    },
    {
        id: 32,
        title: "New Mutants, The",
        format: "4k",
        volume: 0,
        interest: "Owned",
        image: "https://www.themoviedb.org/t/p/original/wI95esQmT9F8eC1wchoRm2ua2HX.jpg",
        created_at: "2021-07-22T13:24:26.045Z",
        updated_at: "2021-07-22T13:24:26.045Z"
    },
    {
        id: 4,
        title: "Made in Abyss",
        format: "Manga",
        volume: 9,
        interest: "Owned",
        image: "https://www.rightstufanime.com/images/productImages/9781645057383_manga-made-in-abyss-volume-9-primary.jpg?resizeid=3",
        created_at: "2021-07-22T12:49:19.293Z",
        updated_at: "2021-07-22T12:49:19.293Z"
    },
    ...
]
```

#### Page

```
https://donns-collection-api.herokuapp.com/collection/:page_number
```
Returns an object with total pages as number and page items.  Will return 20 objects.

```json
{
    totalPages: 3,
    currentPage: {
        pageNumber: 2,
        collection: [
            {
            id: 11,
            title: "Made in Abyss",
            format: "Manga",
            volume: 2,
            interest: "Owned",
            image: "https://www.rightstufanime.com/images/productImages/9781626927742_manga-made-in-abyss-volume-2-primary.jpg?resizeid=3",
            created_at: "2021-07-22T13:09:32.678Z",
            updated_at: "2021-07-22T13:09:32.678Z"
            },
            {
            id: 10,
            title: "Made in Abyss",
            format: "Manga",
            volume: 3,
            interest: "Owned",
            image: "https://www.rightstufanime.com/images/productImages/9781626928275_manga-made-in-abyss-volume-3-primary.jpeg?resizeid=3",
            created_at: "2021-07-22T13:09:14.717Z",
            updated_at: "2021-07-22T13:09:14.717Z"
            }
        ...
        ]
    }
}
```

### Update / Patch

```https://donns-collection-api.herokuapp.com/update/:id```

Will update ```:id``` with contents of body.  The body should only contain the specific field that needs updated.
```json
{
    interst:STRING
}
```

### Delete

```https://donns-collection-api.herokuapp.com//delete/:id```

Will delete the object at ```:id```.

## Frontend

### Link
https://donns-collection.herokuapp.com/

### Browse

Simply press the ```<``` or ```>``` arrows to go to the previous or next page respectively.  The app will not allow you to go below page 1 or above the last page.

### Add

Simply press the ```+``` button at the bottom of the page and fill in the fields, then click add.

#### Tips:

##### Where to get pictures:
* Manga: I like to use rightstufanime.com, simply find the manga, copy link, past in image field, and ensure ```?resizeid=3``` is the option after the filename.
* UHD/BD/DVD: I like to use themoviedb.org, simply find the movie, find the poster you like, enlarge, and copy the image URL.
* Books: I like goodreads.com, simply find the book, enlarge cover, and copy the URL.
* Comics: If you cannot find them at rightstufanime.com as in the Manga description, try goodreads.com like the books direction.

#### Sorting
* Title sorting does not factor leading articles, put "The" at the end, such as: "Grinch, The".
* Sorting is as follows: Title > Format > Volume

#### Volume
Not all collection items have a volume number, leave 0 in that case.

### Update

Click on the collection item, update the relevant fields, and click edit.

### Delete

Click on the collection item, then click delete.