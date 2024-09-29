import NewImage from '@/public/image/photo-1584184924103-e310d9dc82fc.avif';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { GET_POST_BY_ID } from '@/graphql/queries/post.queries';
import { Dialog, DialogTitle } from '@mui/material';
import ProductCardModal from '@/components/card/productCardModal';

interface AddPostCardProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const AddPostModalCard: React.FC<AddPostCardProps> = ({ isOpen, onClose, postId }) => {
  const { data, loading, error } = useQuery(GET_POST_BY_ID, {
    variables: { postId: postId }, 
  });


  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className='bg-blue-950 text-white'>Post Details</DialogTitle>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.getPostById && (
        <div className='bg-gray-400'>
          <ProductCardModal
            image={data.getPostById.image}
            title={data.getPostById.title}
            details={data.getPostById.description}
            color={'Blue , Red'}
            size={'xl , lg'}
            quantity={'20'}
            price={'20000'}
            postId={postId}
          />
        </div>
      )}
    </Dialog>
  );
};

export default AddPostModalCard;
