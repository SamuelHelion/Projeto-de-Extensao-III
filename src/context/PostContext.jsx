import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from 'react';

import api from '../api/api';

const PostContext = createContext();

export function PostProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    const getPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/posts');

            if (response.status === 200) {
                setPosts(response.data);
            } else {
                setError('Erro ao carregar posts');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Erro ao carregar posts');
        } finally {
            setLoading(false);
        }
    }, []);

    const getPostById = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/posts/${id}`);

            if (response.status === 200 || response.status === 304) {
                setPost(response.data);
            } else {
                setError('Erro ao carregar post');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Erro ao carregar post');
        } finally {
            setLoading(false);
        }
    }, []);

    const likePost = useCallback(async (id, isOnDetails) => {
        try {
            const response = await api.put(`/posts/${id}/like`);
            if (response.status === 200) {
                if (isOnDetails) {
                    setPost((prevPost) => ({
                        ...prevPost,
                        likes: prevPost.likes + 1,
                    }));
                } else {
                    setPosts((prevPosts) =>
                        prevPosts.map((p) =>
                            p.id === id ? { ...p, likes: p.likes + 1 } : p
                        )
                    );
                }

            } else {
                setError('Erro ao curtir post');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Erro ao curtir post');
        }
    }, []);

    const createPost = useCallback(async (postData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/posts', postData);
            if (response.status === 201) {
                return { success: true };
            }
            return { success: false, message: 'Erro ao enviar denúncia' };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Erro ao enviar denúncia' };
            setError(error.response?.data?.message || 'Erro ao enviar denúncia');
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <PostContext.Provider
            value={{
                getPosts,
                getPostById,
                likePost,
                createPost,
                posts,
                post,
                loading,
                error,
            }}
        >
            {children}
        </PostContext.Provider>
    );
}

export function usePost() {
    return useContext(PostContext);
}