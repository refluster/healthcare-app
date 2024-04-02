import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { Journal } from '../model';
import { User } from 'firebase/auth';
import { formatRelative } from 'date-fns';
import { queryBooks } from '../api/google-book';

interface Props {
    journal: Journal;
    user: User;
}

type Content = {
    content: string;
    query: string[];
};

type BookInfo = {
    title: string;
    subtitle: string;
    infoLink: string;
    thumbnail: string;
};

const BookRecommendUI: React.FC<Props> = ({ journal }) => {
    const [bookInfo, setBookInfo] = React.useState([] as BookInfo[]);
    const d = journal;
    const content = d.content as Content;

    React.useEffect(() => {
        (async () => {
            const queryResult = await queryBooks({query: content.query, maxResults: 3});
            //const queryResult = QueryResult;
            if (queryResult === undefined) {
                return;
            }
            const _bookInfo = queryResult.items.map(d => ({
                title: d.volumeInfo.title,
                subtitle: d.volumeInfo.subtitle,
                infoLink: d.volumeInfo.infoLink,
                thumbnail: d.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:'),
            } as BookInfo))
            setBookInfo(_bookInfo);
        })();
    }, [content.query]);

    return (
        <Box sx={{ mx: 2, py: 4, borderBottom: '1px solid #eee', display: 'flex' }}>
            <Typography gutterBottom variant="h6" component="div">
                <Box sx={{
                    backgroundColor: '#888',
                    width: 28, height: 28,
                    borderRadius: '50%',
                    mr: 1.5,
                }} />
            </Typography>
            <Box sx={{
                width: '100%',
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    mb: 1,
                }}>
                    <Box>{d.author}</Box>
                    <Box sx={{ fontSize: 12 }}>{formatRelative(d.createdAt, new Date())}</Box>
                </Box>
                <Box sx={{
                }}>
                    <Box sx={{ my: 2 }}>
                        {content.content}
                        <Box>{content.query.join(' ')}</Box>
                    </Box>
                    {bookInfo.map(book => (
                        <Link href={book.infoLink} sx={{
                            textDecoration: 'none',
                            display: 'flex',
                            gap: 2,
                            mb: 2
                        }}>
                            <Box sx={{
                                height: 120,
                                minWidth: 80,
                                backgroundSize: 'cover',
                                backgroundImage: `url(${book.thumbnail})`
                            }} />
                            <Box>
                                <Box sx={{ fontWeight: 500 }}>{book.title}</Box>
                                <Box>{book.subtitle}</Box>
                            </Box>
                        </Link>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default BookRecommendUI;
