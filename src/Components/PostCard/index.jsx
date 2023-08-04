import styled from "@emotion/styled"
import { Card, CardActions, CardContent } from "@mui/material"
import { useState } from "react"

const StyledCard = styled(Card)`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2px 8px;
    @media (max-width: 509px) {
        min-height: 200px;
        padding: 10px 18px;
    }
`

function PostCard({children, post}){
    const splicedTitle = post.title?.slice(0, 18)
    const splicedText = post.content?.slice(0, 20)
    const cardTitle = post.title
    const cardText = post.content
    return (
        <StyledCard elevation={2}>
            <CardContent sx={{padding:'0px'}}>
                <p className='smallpost--title'>{cardTitle}</p>
                <p className='smallpost--content'>{cardText}</p>
            </CardContent>
            <CardActions sx={{padding:'0px'}}>
                {children}
            </CardActions>

        </StyledCard>
    )
}

export {PostCard}