const BASE_URL = 'http://localhost:5000/api/interns';

export async function getInterns() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch interns');
    }
    return response.json();
}

export async function addIntern(intern) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(intern),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to add intern');
    }
    return data;
}

export async function updateStatus(id, status) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to update status');
    }
    return data;
}

export async function deleteIntern(id) {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to delete intern');
    }
    return data;
}