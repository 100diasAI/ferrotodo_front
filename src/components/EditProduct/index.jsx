import EditForm from './form'
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../redux/actions/product';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function submit(product) {
        try {
            await dispatch(updateProduct(product));
            toast.success('Producto actualizado exitosamente!');
            navigate('/admin/dashboard/products');
        } catch (error) {
            toast.error('Error al actualizar el producto');
            console.error("Error al actualizar el producto:", error);
        }
    }

    return <EditForm submit={submit} />
}
