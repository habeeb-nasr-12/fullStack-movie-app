import { useDeleteMovie } from "@/hooks/movies";
import { MovieTVShow } from "@/types";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";

const DeleteMovie = ({ movie }: { movie: MovieTVShow }) => {
  const { mutate: deleteMovie, isPending: isDeleting } = useDeleteMovie();

  const handleDelete = (movieToDelete: MovieTVShow) => {
    Modal.confirm({
      title: "Delete Movie/TV Show",
      content: (
        <div>
          <p>
            Are you sure you want to delete "
            <strong>{movieToDelete.title}</strong>"?
          </p>
          <p>This action cannot be undone.</p>
        </div>
      ),
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        deleteMovie(movieToDelete.id);
      },
    });
  };

  return (
    <Tooltip title="Delete">
      <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
        onClick={() => handleDelete(movie)}
        loading={isDeleting}
      />
    </Tooltip>
  );
};

export default DeleteMovie; 