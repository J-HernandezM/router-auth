import styled from "@emotion/styled"
import { Card, CardActions, CardContent } from "@mui/material"

const StyledCard = styled(Card)(({theme})=>({
    height:'100px',
    width:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between'
}))
const cardInside={
    paddingX:'8px', 
    paddingY:'2px'
}

function PostCard({children, post}){
    const splicedPost = post.content?.slice(0, 20)
    const cardText = splicedPost + '...'


    return (
        <StyledCard elevation={2}>
            <CardContent sx={cardInside}>
                <p className="post--title">{post.title}</p>
                {cardText}
            </CardContent>
            <CardActions sx={cardInside}>
                {children}
            </CardActions>

        </StyledCard>
    )
}

export {PostCard}