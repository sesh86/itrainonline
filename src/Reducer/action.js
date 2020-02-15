import axios from 'axios';

export const getCategories = (data) => {
  return {
    type: 'getCategories',
    data:data
  }
}


export const mapDispatchHome = (dispatch) => {
  return {
    getCategories: (options) =>{
      const request = axios.post('/getCategories',options);
      request.then(function(res){
        dispatch(getCategories(res.data))
      })
    }    
  }
}

export const getBlogs = (data) => {
  return {
    type: 'getBlogs',
    data:data
  }
}


export const mapDispatchBlogList = (dispatch) => {
  return {
    getBlogs: (options) =>{
      const request = axios.post('/getBlogs',options);
      request.then(function(res){
        dispatch(getBlogs(res.data))
      })
    }    
  }
}

export const getDiscussions = (data) => {
  return {
    type: 'getDiscussions',
    data:data
  }
}

export const mapDispatchDiscussionsList = (dispatch) => {
  return {
    getDiscussions: (options) =>{
      const request = axios.post('/getDiscussions',options);
      request.then(function(res){
        dispatch(getDiscussions(res.data))
      })
    }    
  }
}

export const getCourses = (data) => {
  return {
    type: 'getCourses',
    data:data
  }
}

export const mapDispatchCoursesList = (dispatch) => {
  return {
    getCourses: (options) =>{
      const request = axios.post('/getCourses',options);
      request.then(function(res){
        dispatch(getCourses(res.data))
      })
    }    
  }
}

export const getPositions = (data) => {
  return {
    type: 'getPositions',
    data:data
  }
}

export const mapDispatchPositions = (dispatch) => {
  return {
    getPositions: (options) =>{
      const request = axios.post('/getPositions',options);
      request.then(function(res){
        dispatch(getPositions(res.data))
      })
    }    
  }
}