import EditIcon from '@mui/icons-material/Edit';

const EditCommentButton = ({setEditMode, comment}) => {
    return (
        <button onClick={()=>{setEditMode(true)}} data-id={comment.id} type='button' className='comment--btn'>
            <EditIcon fontSize='small' />
        </button>
    );
};

export { EditCommentButton };