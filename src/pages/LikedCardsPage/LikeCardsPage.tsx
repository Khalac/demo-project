import Header from '@/components/Header/Header'
import LikedCardsList from '@/components/LikedCardsList/LikedCardsList'
import './LikeCardsPage.scss'
const LikeCardsPage = () => {
  return (
    <div className="like-cards-page">
      <Header />
      <LikedCardsList />
    </div>
  )
}

export default LikeCardsPage
