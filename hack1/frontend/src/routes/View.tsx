import React, { useCallback, useEffect, useState } from 'react';
import PostCard from '@/components/PostCard';
import ViewFooter from '@/components/ViewFooter';
import { usePost } from '@/contexts/PostContext';
import { useUser } from '@/contexts/UserContext';

const View = (): React.ReactNode => {
  const { user } = useUser();
  const { getPostByIndex, votePost } = usePost();

  /* (1/3) TODO 2.2: Navigation with `ViewFooter` Buttons (8%) */
  /* Hint 2.2.1: Link page index to React state */
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const post = getPostByIndex(0);
  /* End (1/3) TODO 2.2 */

  /* (3/3) TODO 2.2: Navigation with `ViewFooter` Buttons (8%) */
  /* Hint 2.2.4: Finish next and prev click Handler */
  /* Hint 2.2.5: Refer to `PostContext` for more clue */
  const handleNextClick = useCallback(() => {}, []);
  const handlePrevClick = useCallback(() => {}, []);
  /* End (3/3) TODO 2.2 */

  /* (1/3) TODO 2.4: Handle Voting for Unvoted Posts (8%) */
  /* Hint 2.4.1: Determine if the current user has upvoted or downvoted the selected post */
  /* Hint 2.4.2: Refer to the schema of `Post` for more clue */
  const hasUpvoted = user && false;
  const hasDownvoted = user && false;
  /* End (1/3) TODO 2.4 */

  /* (2/3) TODO 2.4: Handle Voting for Unvoted Posts (8%) */
  const handleVoteClick = (vote: 'upvote' | 'downvote') => {
    if (post === null || user === null) return false;
    /* Hint 2.4.3: Call some exported function from `PostContext` */
  };
  /* End of (2/3) TODO 2.4 */

  /* TODO 2.3: Navigation with Keyboard (5%) */
  useEffect(() => {
    /* Hint 1: Finish `handleKeyPress` function */
    const handleKeyPress = (e: { code: string }) => {
      if (e.code === 'ArrowRight') {
        // Next Page
      } else if (e.code === 'ArrowLeft') {
        // Previous Page
      }
    };
    /* Hint 2: Add `handleKeyPress` function as event listener to keyboard input event */
    window.addEventListener('', () => {});
    return () => window.removeEventListener('', () => {});
    /* Hint 3: Update the dependency array of `useEffect` hook */
  }, []);
  /* End TODO 2.3 */

  return post ? (
    <>
      {/* TODO 2.1: Render Post With `PostCard` and `PostContext` (3%) */}
      {/* Hint 2.1.1: Pass correct arguments to `PostCard` component */}
      {/* Hint 2.1.2: Arguments `post` should be Modified */}
      <PostCard post={null} />
      {/* End TODO 2.1 */}

      <div className="mt-auto">
        {/* (2/3) TODO 2.2: Navigation with `ViewFooter` Buttons (8%) */}
        {/* (3/3) TODO 2.4: Navigation with `ViewFooter` Buttons (8%) */}
        {/* Hint 2.2.2, 2.4.4: Pass correct arguments to `ViewFooter` component */}
        {/* Hint 2.2.3: Arguments `nextClickHandler` and `prevClickHandler` should be modified */}
        {/* Hint 2.4.5: Arguments `downvoteClickHandler`, `upvoteClickHandler`, `hasUpvoted`, `hasDownvoted` and `totalVotes` should be Modified */}
        {/* Hint 2.4.5: Arguments `downvoteClickHandler`, `upvoteClickHandler`, `hasUpvoted`, `hasDownvoted` and `totalVotes` should be Modified */}
        <ViewFooter
          downvoteClickHandler={() => {}}
          upvoteClickHandler={() => {}}
          hasDownvoted={false}
          hasUpvoted={false}
          nextClickHandler={() => {}}
          prevClickHandler={() => {}}
          totalVotes={0}
          loading={false}
        />
        {/* End (3/3) TODO 2.4 */}
        {/* End (2/3) TODO 2.2 */}
      </div>
    </>
  ) : (
    <div className="flex h-full items-center justify-center">
      There are no posts to view.
    </div>
  );
};

export default View;
