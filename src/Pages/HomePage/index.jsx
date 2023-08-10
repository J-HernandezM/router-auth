import styled from '@emotion/styled';
import { Widgets } from '@mui/icons-material';
import { Paper } from '@mui/material';
import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const HomePaper = styled(Paper)`
        display: flex;
        flex-direction:column;
        text-align: start;
        gap: 10px;
        padding: 20px 30px;
        min-width: 360px;
        max-width: 900px;
        min-height: 500px;
        width: 80%;
`
const MarkDown = styled(ReactMarkdown)`
        min-width: 300px;
        max-width: 900px;
        gap: 10px;
        display: flex;
        flex-direction: column;
`

const markdown = `

This is a test for a blog created using **React Router**, aplying authorization and authentication and some other features like the following:

    - Add, edit or delete posts
    - Add, edit or delete comments
    - Dynamic profiles with specific routes
    - Validations of authorization and
      authentication permissions
    - Persistance of information using
      localStorage
    - Both posts and comments supports
      markdown
    - Dynamic profiles
    - Edit your own profile and see other profiles
    - Profile information persists (Except for profile image :c)
    - Comments leads to author's profile (if it has been created before)
    

**If you want to try all the features login as 'admin'**, you can also login as 'editor' or the name you want to see the author permissions.

Made by: [J-HernandezM](https://github.com/J-HernandezM) :)

Feel free to try every feature
`

function HomePage(props) {
    return (
        <>
            <h1>HomePage</h1>
            <HomePaper>
                <MarkDown children={markdown} />
                <img style={{maxWidth:'300px', alignSelf:'center', marginTop:'10px'}} src="https://media.tenor.com/NFeV9svhtREAAAAC/community-ken-jeong.gif"/>
            </HomePaper>
        </>
    );
}

export { HomePage };