import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { SWEET_ALERT } from '../../utils/constants';

const SweetAlert = () => {
  const MySwal = withReactContent(Swal);

  MySwal.fire({
    title: <strong>{SWEET_ALERT.title}</strong>,
    html: <i>{SWEET_ALERT.desc}</i>,
    icon: 'success',
  });
};

export default SweetAlert;
