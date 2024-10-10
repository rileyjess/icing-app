const newFormHandler = async (event) => {
    event.preventDefault();

    const item_ordered = document.querySelector('#item-ordered').value.trim();
    const customer_name = document.querySelector('#customer-name').value.trim();
    const pickup_date = document.querySelector('#pickup-date').value.trim();
    const employee = document.querySelector('#employee-list').value;
    const details = document.querySelector('#details').value.trim();

    if (item_ordered && customer_name && pickup_date && employee && details) {
        const response = await fetch(`/api/orders`, {
            method: 'POST',
            body: JSON.stringify({ item_ordered, customer_name, pickup_date, employee, detail }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create order');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/orders/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete order');
        }
    }
};

document
    .querySelector('.new-order-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.pickup-list')
    .addEventListener('click', delButtonHandler);