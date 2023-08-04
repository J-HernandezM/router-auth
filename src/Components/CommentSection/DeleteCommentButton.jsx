import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import { BlogContext } from '../../Context/BlogContext';

const DeleteCommentButton = ({comment}) => {
    const { deleteComment } = useContext(BlogContext)

    const handleDelete = (event) => {
        let currentNode = event.target
        while(currentNode.nodeName!='BUTTON'){
            currentNode=currentNode.parentElement
        }
        const id = currentNode.dataset.id
        deleteComment(blogpost, id)
    }

    return (
        <button onClick={handleDelete} data-id={comment.id} type='button' className='comment--btn'>
            <DeleteIcon fontSize='small' />
        </button>
    );
};

export { DeleteCommentButton };