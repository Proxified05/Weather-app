import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CustomAlert({ isVisible, title, message, onClose }: { isVisible: boolean; title: string; message: string; onClose: () => void }) {
    return (
        <Modal
            transparent
            animationType='fade'
            visible={isVisible}
        >
            <View style={styles.overlay}>
                <View style={styles.alertBox}>

                    <Text style={styles.title}>{title}</Text>

                    <Text style={styles.message}>{message}</Text>

                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    alertBox: {
        width: 280,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
    },

    title: {
        fontSize: 18,
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 10
    },

    message: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20
    },

    button: {
        backgroundColor: '#000000',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 6
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }

});