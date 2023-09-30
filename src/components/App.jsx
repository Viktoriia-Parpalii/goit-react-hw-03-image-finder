import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages, fetchImagesByCategories } from 'services/api';

import React, { Component } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './Button/Button';
export class App extends Component {
  state = {
    images: null,
    isLoading: false,
    error: null,
    searchedImagesName: null,
    modal: {
      isOpen: false,
      data: null,
    },
    currentPage: 1,
  };
  fetchMoreImages = () => {
    this.setState(prevState => {
      return { currentPage: prevState.currentPage + 1 };
    });
  };
  // fetchAllImages = async () => {
  //   try {
  //     this.setState({ isLoading: true });
  //     const allImages = await fetchImages(this.state.currentPage);
  //     this.setState({ images: allImages });
  //   } catch (error) {
  //     this.setState({
  //       error: toast.error(error.message, { theme: 'colored' }),
  //     });
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // };
  // componentDidMount() {
  //   this.fetchAllImages();
  // }

  saveSearchedImagesNameInState = searchedImagesName => {
    this.setState({ searchedImagesName: searchedImagesName });
  };
  fetchByName = async () => {
    try {
      this.setState({ isLoading: true });
      const imagesByCategories = await fetchImagesByCategories(
        this.state.searchedImagesName,
        this.state.currentPage
      );
      this.setState({ images: imagesByCategories });
    } catch (error) {
      this.setState({ error: toast.error(error.message) });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevState.searchedImagesName !== this.state.searchedImagesName
    ) {
      this.fetchByName();
    }
  }
  onOpenModal = modalData => {
    this.setState({
      modal: {
        isOpen: true,
        data: modalData,
      },
    });
  };
  onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        data: null,
      },
    });
  };
  render() {
    return (
      <>
        <Searchbar
          saveSearchedImagesNameInState={this.saveSearchedImagesNameInState}
        />
        {this.state.isLoading && (
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        )}

        {this.state.error && <ToastContainer />}
        <ImageGallery
          images={this.state.images}
          onOpenModal={this.onOpenModal}
        />
        {this.state.images && <Button fetchMoreImages={this.fetchMoreImages} />}
        {this.state.modal.isOpen && (
          <Modal
            data={this.state.modal.data}
            onCloseModal={this.onCloseModal}
          />
        )}
      </>
    );
  }
}
