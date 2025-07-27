import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Row,
  Col,
  Tooltip,
} from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useCreateMovie, useUpdateMovie } from "@/hooks/movies";
import { MovieTVShow, MovieTVShowFormData } from "@/types";

const { TextArea } = Input;
const { Option } = Select;

const AddUpdateMovie: React.FC<{
  movie: MovieTVShow | null;
}> = ({ movie = null }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const { mutate: createMovie, isPending: isCreating } = useCreateMovie();
  const { mutate: updateMovie, isPending: isUpdating } = useUpdateMovie();

  const handleModalClose = useCallback(() => {
    setOpen(false);
  }, []);

  const isEditing = !!movie;
  const isLoading = isCreating || isUpdating;

  const handleSubmit = useCallback(async (values: MovieTVShowFormData) => {
    try {
      const formData = {
        ...values,
        budget: values.budget,
        location: values.location,
        duration: values.duration,
        genre: values.genre || "",
        rating: values.rating || 0,
        description: values.description || "",
        poster_url: values.poster_url || "",
      };

      if (isEditing && movie) {
        updateMovie({
          id: movie.id,
          data: formData,
        });
      } else {
        createMovie(formData);
      }

      form.resetFields();
      handleModalClose();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  }, [isEditing, movie, updateMovie, createMovie, form, handleModalClose]);

  const handleCancel = useCallback(() => {
    form.resetFields();
    handleModalClose();
  }, [form, handleModalClose]);

  const typeOptions = useMemo(() => [
    { value: "Movie", label: "Movie" },
    { value: "TV Show", label: "TV Show" },
  ], []);

  const statusOptions = useMemo(() => [
    { value: "Watched", label: "Watched" },
    { value: "Currently Watching", label: "Currently Watching" },
    { value: "Want to Watch", label: "Want to Watch" },
  ], []);

  const ratingOptions = useMemo(() => [
    { value: 10, label: "10 - Masterpiece" },
    { value: 9, label: "9 - Excellent" },
    { value: 8, label: "8 - Very Good" },
    { value: 7, label: "7 - Good" },
    { value: 6, label: "6 - Above Average" },
    { value: 5, label: "5 - Average" },
    { value: 4, label: "4 - Below Average" },
    { value: 3, label: "3 - Poor" },
    { value: 2, label: "2 - Very Poor" },
    { value: 1, label: "1 - Terrible" },
  ], []);

  useEffect(() => {
    if (movie && open) {
      setTimeout(() => {
        form.setFieldsValue({
          ...movie,
          rating: Number(movie?.rating) || undefined,
          budget: Number(movie?.budget) || undefined,
          duration: Number(movie?.duration) || undefined,
          year: movie?.year || undefined,
        });
      }, 100);
    } else {
      form.setFieldsValue({
        status: "Want to Watch",
        year: new Date().getFullYear(),
      });
    }
  }, [movie, form, open]);

  return (
    <div>
      {movie ? (
        <Tooltip title="Edit">
          <Button
            type="text"
            icon={<EditOutlined className="text-brand-500" />}
            onClick={() => setOpen(true)}
            aria-label={`Edit ${movie.title}`}
          />
        </Tooltip>
      ) : (
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => setOpen(true)}
          aria-label="Add new movie or TV show"
          className="bg-brand-500 hover:!bg-brand-500 hover:border-brand-500"
        >
          Add Movie/TV Show
        </Button>
      )}

      <Modal
        title={isEditing ? "Edit Movie/TV Show" : "Add New Movie/TV Show"}
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={800}
        destroyOnClose
        aria-label={isEditing ? "Edit movie form" : "Add movie form"}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
          aria-label="Movie/TV Show form"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter the title" }]}
              >
                <Input 
                  placeholder="Enter title"
                  aria-label="Movie or TV show title"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please select the type" }]}
              >
                <Select 
                  placeholder="Select type"
                  aria-label="Select movie or TV show type"
                >
                  {typeOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Director"
                name="director"
                rules={[{ required: true, message: "Please enter the director name" }]}
              >
                <Input 
                  placeholder="Enter director name"
                  aria-label="Director name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Year"
                name="year"
                rules={[{ required: true, message: "Please enter the year" }]}
              >
                <InputNumber
                  min={1900}
                  max={new Date().getFullYear() + 1}
                  style={{ width: "100%" }}
                  placeholder="Year"
                  aria-label="Release year"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
           
            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Please select the status" }]}
              >
                <Select 
                  placeholder="Select status"
                  aria-label="Select watch status"
                >
                  {statusOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Rating"
                name="rating"
              >
                <Select 
                  placeholder="Select rating"
                  allowClear
                  aria-label="Select rating"
                >
                  {ratingOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Genre"
                name="genre"
              >
                <Input 
                  placeholder="Enter genre"
                  aria-label="Genre"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: "Please enter the location" }]}
              >
                <Input 
                  placeholder="Enter location"
                  aria-label="Location"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Duration (minutes)"
                name="duration"
                rules={[{ required: true, message: "Please enter the duration" }]}
              >
                <InputNumber
                  min={1}
                  style={{ width: "100%" }}
                  placeholder="Duration"
                  aria-label="Duration in minutes"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Budget"
                name="budget"
                rules={[{ required: true, message: "Please enter the budget" }]}
              >
                <InputNumber
                  min={1}
                  style={{ width: "100%" }}
                  placeholder="Budget"
                  aria-label="Budget amount"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Poster URL"
                name="poster_url"
                rules={[
                  { type: "url", message: "Please enter a valid URL" }
                ]}
              >
                <Input 
                  placeholder="Enter poster URL"
                  aria-label="Poster image URL"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Description"
            name="description"
          >
            <TextArea
              rows={4}
              placeholder="Enter description"
              aria-label="Description"
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end space-x-2">
              <Button onClick={handleCancel} aria-label="Cancel">
                Cancel
              </Button>
              <Button
                type="primary"
                className="bg-brand-500 hover:!bg-brand-500 hover:border-brand-500"
                htmlType="submit"
                loading={isLoading}
                aria-label={isEditing ? "Update movie" : "Create movie"}
              >
                {isEditing ? "Update" : "Create"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddUpdateMovie; 