import { useDispatch, useSelector } from "react-redux";
import { addLikedCard, unlikedCard } from "../model/slice";
import { DataFetchType } from "@/types/dataFetch";
import { LikedCardType } from "../model/type";

type ButtonLikeCardProps = {
  idCard: string;
  data: DataFetchType;
};

const ButtonLikeCard = ({ idCard, data }: ButtonLikeCardProps) => {
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const handleLike = (card: LikedCardType) => {
    if (
      user.likedCards.some((a: any) => {
        return a.id === idCard;
      })
    ) {
      dispatch(unlikedCard(card));
    } else {
      dispatch(addLikedCard(card));
    }
  };
  return (
    <button
      className={`card-info__button ${
        user.likedCards.some((a: any) => {
          return a.id === idCard;
        })
          ? "card-info__button--liked"
          : ""
      }`}
      onClick={() =>
        handleLike({
          id: data.id!,
          name: data.name,
          image: data.image!,
          types: data.types!,
        })
      }
    >
      {user.likedCards.some((a: any) => {
        return a.id === idCard;
      })
        ? "Liked"
        : "Like"}
    </button>
  );
};

export default ButtonLikeCard;
