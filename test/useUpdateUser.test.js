import { renderHook, act } from '@testing-library/react';
import useUpdateUser from '@/hooks/useUpdateUser.js';
import { useMutation, gql } from '@apollo/client';

jest.mock('@apollo/client', () => ({
    useMutation: jest.fn(),
    gql: jest.fn((query) => query), // Mock de gql
}));

global.FileReader = class {
    readAsDataURL = jest.fn();
    onload = jest.fn();
};

describe('useUpdateUser Hook', () => {
    const mockUser = {
        id: '1',
        username: 'testuser',
        email: 'testuser@example.com',
        photo: 'testphoto.jpg',
    };

    const mockUpdateUser = jest.fn(() => Promise.resolve({
        data: { updateUser: { user: { ...mockUser, username: 'newuser' } } }
    }));

    beforeEach(() => {
        useMutation.mockReturnValue([mockUpdateUser]);
    });

    it('debería inicializar correctamente los valores del usuario', () => {
        const { result } = renderHook(() => useUpdateUser({ user: mockUser }));

        expect(result.current.inputsUser.username).toBe(mockUser.username);
        expect(result.current.inputsUser.email).toBe(mockUser.email);
        expect(result.current.img).toBe(mockUser.photo);
    });

    it('debería actualizar el estado al cambiar un campo', () => {
        const { result } = renderHook(() => useUpdateUser({ user: mockUser }));

        act(() => {
            result.current.handleChange({ target: { name: 'username', value: 'newuser' } });
        });

        expect(result.current.inputsUser.username).toBe('newuser');
    });

    it('debería manejar errores al cargar una imagen demasiado grande', () => {
        const { result } = renderHook(() => useUpdateUser({ user: mockUser }));

        const largeFile = new File([''], 'large.jpg', { size: 6 * 1024 * 1024 }); // 6MB

        act(() => {
            result.current.handlePhotoChange({ target: { files: [largeFile] } });
        });

        expect(result.current.errorImg.status).toBe(true);
        expect(result.current.errorImg.message).toBe('El archivo es demasiado grande');
    });

    it('debería manejar el envío del formulario correctamente', async () => {
        const { result } = renderHook(() => useUpdateUser({ user: mockUser }));

        act(() => {
            result.current.handleChange({ target: { name: 'username', value: 'newuser' } });
        });

        await act(async () => {
            await result.current.handleSubmit({ preventDefault: jest.fn() });
        });

        expect(mockUpdateUser).toHaveBeenCalledWith({
            variables: {
                id: mockUser.id,
                username: 'newuser',
                email: mockUser.email,
                photo: mockUser.photo,
            },
        });
    });
});
