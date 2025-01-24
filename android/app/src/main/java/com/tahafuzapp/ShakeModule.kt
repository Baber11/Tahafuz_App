package com.tahafuzapp

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import kotlin.math.atan2
import kotlin.math.sqrt

class ShakeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), SensorEventListener {

    private val sensorManager: SensorManager = reactContext.getSystemService(Context.SENSOR_SERVICE) as SensorManager
    private val accelerometer: Sensor? = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
    private val SHAKE_THRESHOLD = 4.0f // Adjust sensitivity
    private var lastShakeTime: Long = 0

    override fun getName(): String {
        return "ShakeModule"
    }

    @ReactMethod
    fun startListening() {
        accelerometer?.let {
            sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_UI)
        }
    }

    @ReactMethod
    fun stopListening() {
        sensorManager.unregisterListener(this)
    }

    override fun onSensorChanged(event: SensorEvent?) {
        event?.let {
            if (it.sensor.type == Sensor.TYPE_ACCELEROMETER) {
                val x = it.values[0]
                val y = it.values[1]
                val z = it.values[2]

                // Calculate the angle in degrees
                val angle = Math.toDegrees(atan2(y.toDouble(), sqrt((x * x + z * z).toDouble())))

                // Filter events that are not within 0° to 180°
                if (angle < 0 || angle > 180) return

                // Calculate g-force to detect significant shake
                val acceleration = sqrt((x * x + y * y + z * z).toDouble()).toFloat() - SensorManager.GRAVITY_EARTH

                // Check if the shake exceeds the threshold
                if (acceleration > SHAKE_THRESHOLD) {
                    val currentTime = System.currentTimeMillis()
                    if ((currentTime - lastShakeTime) > 12000) { // Prevent multiple triggers within 2 seconds
                        lastShakeTime = currentTime
                        sendShakeEvent()
                    }
                }
            }
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        // No-op
    }

    private fun sendShakeEvent() {
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("ShakeEvent", null)
    }
}
