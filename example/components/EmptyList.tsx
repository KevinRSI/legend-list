import { StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

const EmptyList = () => {
    return (
        <ThemedView style={styles.container}>
            <ThemedText>No data</ThemedText>
        </ThemedView>
    );
};

export default EmptyList;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 12,
    },
});
