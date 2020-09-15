//
//  recording.swift
//  aLifeLived
//
//  Created by Max Kelly on 15/7/20.
//
//class recording: NSObject, AVAudioPlayerDelegate, AVAudioRecorderDelegate {
//  var audioRecorder:AVAudioRecorder!
//
//  var audioRecorder:AVAudioRecorder!
//  var soundPlayer = AVAudioPlayer()
//  var numberOfRecords = 0
//
//  func recordingStatus() {
//    numberOfRecords += 1
//    let filename = getDirectory().appendingPathComponent("\(numberOfRecords).m4a")
//    let settings : [String:Any] = [ AVFormatIDKey : kAudioFormatAppleLossless,
//    AVEncoderAudioQualityKey : AVAudioQuality.max.rawValue,
//    AVEncoderBitRateKey : 320000,
//    AVNumberOfChannelsKey : 2,
//    AVSampleRateKey : 44100.0 ]
//
//    // Start recording
//    do {
//      audioRecorder = try AVAudioRecorder(url: filename, settings: settings)
//      audioRecorder.delegate = self
//      audioRecorder.record()
//    } catch {
//      displayAlert(title: "Oops!", message: "Recording failed")
//    }
//  }
//
//
//
//  // Function that gets path to directory
//  func getDirectory() -> URL {
//    let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
//    let documentDirectory = paths[0]
//    return documentDirectory
//  }
//
//  // Function that displays an alert
//  func displayAlert(title:String, message:String) {
//    let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)
//    alert.addAction(UIAlertAction(title: "dismiss", style: .default, handler: nil))
//  }
//}
import Foundation
import UIKit
import AVFoundation

@objc(recording)
class recording: NSObject, AVAudioRecorderDelegate {
    var audioRecorder:AVAudioRecorder!
    var soundPlayer = AVAudioPlayer()
    var numberOfRecords = 0
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  func startRecording(_ callback: RCTResponseSenderBlock) {
    if audioRecorder == nil {
      let filename = getDirectory().appendingPathComponent("\(numberOfRecords).m4a")
      let settings : [String:Any] = [ AVFormatIDKey : kAudioFormatAppleLossless,
      AVEncoderAudioQualityKey : AVAudioQuality.max.rawValue,
      AVEncoderBitRateKey : 320000,
      AVNumberOfChannelsKey : 2,
      AVSampleRateKey : 44100.0 ]
      print("MAX", audioRecorder)
      audioRecorder.delegate = self
      
      audioRecorder.record()
    } else {
      
    }

    callback(["MAX", audioRecorder])
  }

  func recordingStatus() {
    numberOfRecords += 1
    let filename = getDirectory().appendingPathComponent("\(numberOfRecords).m4a")
    let settings : [String:Any] = [ AVFormatIDKey : kAudioFormatAppleLossless,
    AVEncoderAudioQualityKey : AVAudioQuality.max.rawValue,
    AVEncoderBitRateKey : 320000,
    AVNumberOfChannelsKey : 2,
    AVSampleRateKey : 44100.0 ]

    // Start recording
    do {
      audioRecorder = try AVAudioRecorder(url: filename, settings: settings)
      audioRecorder.delegate = self
      audioRecorder.record()
    } catch {
      displayAlert(title: "Oops!", message: "Recording failed")
    }
  }

  // Function that gets path to directory
  func getDirectory() -> URL {
    let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
    let documentDirectory = paths[0]
    return documentDirectory
  }

  // Function that displays an alert
  func displayAlert(title:String, message:String) {
    let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)
    alert.addAction(UIAlertAction(title: "dismiss", style: .default, handler: nil))
  }
}