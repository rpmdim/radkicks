// Variabel untuk melacak timeout agar notifikasi tidak tumpang tindih
let toastTimeout;

/**
 * Menampilkan notifikasi toast dengan pesan dan tipe yang ditentukan.
 * @param {string} title - Judul notifikasi.
 * @param {string} message - Pesan notifikasi.
 * @param {string} type - Tipe notifikasi ('success', 'error', 'warning', 'info', 'special').
 * @param {number} duration - Durasi tampilan notifikasi dalam milidetik.
 */
function showToast(title, message, type = 'info', duration = 4000) {
    const toastComponent = document.getElementById('toast-component');
    const toastIcon = document.getElementById('toast-icon');
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');

    if (!toastComponent || !toastIcon || !toastTitle || !toastMessage) {
        console.error("Elemen toast tidak ditemukan!");
        return;
    }

    clearTimeout(toastTimeout);

    toastComponent.classList.remove(
        'bg-green-100', 'border-green-500', 'text-green-800',
        'bg-red-100', 'border-red-500', 'text-red-800',
        'bg-yellow-100', 'border-yellow-500', 'text-yellow-800',
        'bg-blue-100', 'border-blue-500', 'text-blue-800',
        'bg-purple-100', 'border-purple-500', 'text-purple-800'
    );
    toastComponent.style.borderLeft = '4px solid';

    switch (type) {
        case 'success':
            toastIcon.textContent = '⚽';
            toastComponent.classList.add('bg-green-100', 'text-green-800');
            toastComponent.style.borderColor = '#22c55e';
            break;
        case 'error':
            toastIcon.textContent = '❌';
            toastComponent.classList.add('bg-red-100', 'text-red-800');
            toastComponent.style.borderColor = '#ef4444';
            break;
        case 'warning':
            toastIcon.textContent = '⚠️';
            toastComponent.classList.add('bg-yellow-100', 'text-yellow-800');
            toastComponent.style.borderColor = '#f59e0b';
            break;
        case 'special':
            toastIcon.textContent = '🔥';
            toastComponent.classList.add('bg-purple-100', 'text-purple-800');
            toastComponent.style.borderColor = '#8b5cf6';
            break;
        default: // 'info' atau tipe lain
            toastIcon.textContent = 'ℹ️';
            toastComponent.classList.add('bg-blue-100', 'text-blue-800');
            toastComponent.style.borderColor = '#3b82f6'; // blue-500
            break;
    }

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    toastComponent.classList.remove('opacity-0', 'translate-y-64');
    toastComponent.classList.add('opacity-100', 'translate-y-0');

    toastTimeout = setTimeout(() => {
        toastComponent.classList.remove('opacity-100', 'translate-y-0');
        toastComponent.classList.add('opacity-0', 'translate-y-64');
    }, duration);
}