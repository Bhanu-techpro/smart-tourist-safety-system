import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useTranslation } from 'react-i18next';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const { t, i18n } = useTranslation();
  const [isHindi, setIsHindi] = useState(i18n.language === 'hi');

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const response = await api.get(`/tourist/${user.id}`);
          setProfile(response.data);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const toggleLanguage = (value) => {
    setIsHindi(value);
    i18n.changeLanguage(value ? 'hi' : 'en');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('profile')}</Text>
      {profile ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>
            {t('name')}: <Text style={styles.value}>{profile.name}</Text>
          </Text>
          <Text style={styles.label}>
            {t('email')}: <Text style={styles.value}>{profile.email}</Text>
          </Text>
          <Text style={styles.label}>
            {t('nationality')}:{' '}
            <Text style={styles.value}>{profile.nationality}</Text>
          </Text>
        </View>
      ) : (
        <Text>{t('loading')}</Text>
      )}
      <View style={styles.languageSwitch}>
        <Text>{t('changeLanguage')}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isHindi ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleLanguage}
          value={isHindi}
        />
      </View>
      <Button title={t('logout')} onPress={logout} color="#d9534f" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontWeight: 'normal',
  },
  languageSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
});
