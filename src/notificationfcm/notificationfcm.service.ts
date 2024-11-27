import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import {
  MultipleDeviceNotificationDto,
  NotificationDto,
  TopicNotificationDto,
} from './dto/notification.dto';

@Injectable()
export class NotificationfcmService {
  async sendNotification({ token, title, body, icon }: NotificationDto) {
    try {
      const message = {
        token,
        notification: {
          title,
          body,
        },
        android: {
          priority: 'high' as const,
          notification: {
            icon: icon || '@mipmap/ic_launcher',
            color: '#FF0000',
            sound: 'default',
            priority: 'high' as const,
            channelId: 'default',
          },
        },
        apns: {
          headers: {
            'apns-priority': '10',
          },
          payload: {
            aps: {
              alert: {
                title,
                body,
              },
              sound: 'default',
              badge: 1,
              contentAvailable: true,
            },
          },
        },
        data: {
          // Datos adicionales si los necesitas
          click_action: 'FLUTTER_NOTIFICATION_CLICK',
          sound: 'default',
        },
      };

      const response = await admin.messaging().send(message);
      console.log('Notification sent successfully:', response);
      return { success: true, messageId: response };
    } catch (error) {
      console.error('Error sending notification:', error);
      throw new Error(`Failed to send notification: ${error.message}`);
    }
  }

  async sendNotificationToMultipleTokens({
    tokens,
    title,
    body,
    icon,
  }: MultipleDeviceNotificationDto) {
    const message = {
      notification: {
        title,
        body,
        imageUrl: icon || undefined,
      },
      tokens: tokens,
      // Android specific configuration
      android: {
        notification: {
          channelId: 'default',
          icon: icon || '@mipmap/ic_launcher',
          color: '#FF0000',
          priority: 'high' as const,
        },
      },
      // iOS specific configuration
      apns: {
        payload: {
          aps: {
            alert: {
              title,
              body,
            },
            sound: 'default',
            badge: 1,
          },
        },
      },
      // Optional data payload
      data: {
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
      },
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      
      console.log('Multicast Response:', {
        successCount: response.successCount,
        failureCount: response.failureCount,
        responses: response.responses,
      });

      const failedTokens = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push({
            token: tokens[idx],
            error: resp.error?.message || 'Unknown error',
          });
        }
      });

      if (response.failureCount > 0) {
        console.log('Failed tokens:', failedTokens);
      }

      return {
        success: true,
        successCount: response.successCount,
        failureCount: response.failureCount,
        failedTokens: failedTokens,
      };
    } catch (error) {
      console.error('Error sending notifications:', error);
      return {
        success: false,
        message: error.message,
        error: error.code || 'UNKNOWN_ERROR',
      };
    }
  }

  async sendTopicNotification({
    topic,
    title,
    body,
    icon,
  }: TopicNotificationDto) {
    const message = {
      notification: {
        title,
        body,
      },
      android: {
        priority: 'high' as const,
        notification: {
          icon: icon || '@mipmap/ic_launcher',
          color: '#FF0000',
          sound: 'default',
          priority: 'high' as const,
          channelId: 'default',
        },
      },
      apns: {
        headers: {
          'apns-priority': '10',
        },
        payload: {
          aps: {
            alert: {
              title,
              body,
            },
            sound: 'default',
            badge: 1,
            contentAvailable: true,
          },
        },
      },
      data: {
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
        sound: 'default',
      },
      topic,
    };

    try {
      const response = await admin.messaging().send(message);
      console.log('Topic notification sent:', response);
      return { success: true, messageId: response };
    } catch (error) {
      console.error('Error sending topic notification:', error);
      return { 
        success: false, 
        message: `Failed to send topic notification: ${error.message}` 
      };
    }
  }
}