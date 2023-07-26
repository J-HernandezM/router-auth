import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import React from 'react';

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

function HomePage(props) {
    return (
        <>
            <h1>HomePage</h1>
            <HomePaper>
                <p>This is a test blog with React Router, aplying authorization and authentication</p>
                <p>If you want to try all the features login as 'admin', you can also login as 'editor'</p>
                <p>Made by: J-HernandezM :&#41;</p>
            </HomePaper>
        </>
    );
}

export { HomePage };