"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  ArrowUpRight, 
  Check, 
  Film, 
  UploadCloud, 
  Trash2, 
  Settings2, 
  Sliders, 
  Play, 
  CheckCircle2, 
  RefreshCw, 
  FileVideo,
  ChevronDown,
  Info,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import Navbar from "@/components/Navbar";

// Constants for UI
const PRESETS = [
  { id: "h264", name: "H.264 / AAC (Standard MP4)", desc: "Universal compatibility, ideal for web streaming", codec: "libx264" },
  { id: "h265", name: "H.265 / HEVC (High Efficiency)", desc: "Excellent quality at half the bitrate, modern devices", codec: "libx265" },
  { id: "av1", name: "AV1 (Next-Gen Open Format)", desc: "Ultra-efficient compression, royalty-free", codec: "libsvtav1" },
  { id: "prores", name: "ProRes (Production Quality)", desc: "Visually lossless, perfect for master editing files", codec: "prores_ks" },
  { id: "hls", name: "HLS Adaptive Streaming", desc: "Generates multi-bitrate ladder and .m3u8 manifest", codec: "h264_hls" },
];

const RESOLUTIONS = [
  { id: "4k", name: "4K UHD (2160p)", enabled: true },
  { id: "1080p", name: "Full HD (1080p)", enabled: true },
  { id: "720p", name: "HD (720p)", enabled: true },
  { id: "480p", name: "SD (480p)", enabled: false },
];

export default function UploadPage() {
  // Client component states
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: number; type: string } | null>(null);
  const [selectedPreset, setSelectedPreset] = useState("h264");
  const [selectedResolutions, setSelectedResolutions] = useState<string[]>(["1080p", "720p"]);
  const [outputContainer, setOutputContainer] = useState("mp4");
  const [error, setError] = useState<string | null>(null);
  
  // Simulated upload/transcode states
  const [jobStatus, setJobStatus] = useState<"idle" | "uploading" | "transcoding" | "completed">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [transcodeProgress, setTranscodeProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-adjust output container base on preset
  useEffect(() => {
    if (selectedPreset === "hls") {
      setOutputContainer("m3u8");
    } else if (selectedPreset === "av1") {
      setOutputContainer("webm");
    } else if (selectedPreset === "prores") {
      setOutputContainer("mov");
    } else {
      setOutputContainer("mp4");
    }
  }, [selectedPreset]);

  // Handle Drag Events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle Drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // Accept any video type ffmpeg could parse generally, or generic fallback
      if (file.type.startsWith("video/") || file.name.match(/\.(mp4|mov|avi|mkv|webm|flv|wmv|m4v|3gp|mpeg|ogv)$/i)) {
        if (file.size > 100 * 1024 * 1024) {
          setError("File size exceeds the 100 MB limit. Please choose a smaller file.");
          return;
        }
        setError(null);
        setSelectedFile({
          name: file.name,
          size: file.size,
          type: file.type || "video/unknown"
        });
      } else {
        setError("Invalid file type. Please upload a video file.");
      }
    }
  };

  // Handle File Input Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 100 * 1024 * 1024) {
        setError("File size exceeds the 100 MB limit. Please choose a smaller file.");
        return;
      }
      setError(null);
      setSelectedFile({
        name: file.name,
        size: file.size,
        type: file.type || "video/unknown"
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    setJobStatus("idle");
    setUploadProgress(0);
    setTranscodeProgress(0);
    setLogs([]);
    setError(null);
  };

  const toggleResolution = (resId: string) => {
    setSelectedResolutions(prev => 
      prev.includes(resId) 
        ? prev.filter(r => r !== resId) 
        : [...prev, resId]
    );
  };

  // Format File Size
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // Simulate Pipeline (Mock upload and transcode log steps)
  const startMockPipeline = () => {
    if (!selectedFile) return;
    setJobStatus("uploading");
    setUploadProgress(0);
    setTranscodeProgress(0);
    setLogs(["Starting secure upload channel..."]);

    // Upload simulation
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          startMockTranscoding();
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 5;
        const next = Math.min(prev + step, 100);
        if (next === 30) setLogs(l => [...l, `Transferring metadata chunks...`]);
        if (next === 70) setLogs(l => [...l, `Verifying file checksum integrity (SHA-256)...`]);
        return next;
      });
    }, 200);
  };

  const startMockTranscoding = () => {
    setJobStatus("transcoding");
    setLogs(l => [
      ...l, 
      `✓ File upload successful.`,
      `Initializing ffmpeg-worker node...`,
      `Probing stream information: Codec detected: ${selectedFile?.type.split("/")[1] || "h264"}`,
      `Mapping output streams with presets: codec=${PRESETS.find(p => p.id === selectedPreset)?.codec}...`
    ]);

    const transcodingSteps = [
      { pct: 10, log: "Extracting audio and mapping channels..." },
      { pct: 25, log: `Spawning CPU/GPU decoder instances (Region: fra1)...` },
      { pct: 45, log: `Encoding video layers: ${selectedResolutions.join(", ")}...` },
      { pct: 70, log: "Multiplexing target streams into container format..." },
      { pct: 85, log: "Writing structural metadata, keyframes positioning..." },
      { pct: 95, log: "Optimizing Web Fast Start (qt-faststart) header..." },
      { pct: 100, log: "✓ Transcoding pipeline finished successfully." }
    ];

    let currentStepIdx = 0;
    const transcodeInterval = setInterval(() => {
      setTranscodeProgress(prev => {
        if (prev >= 100) {
          clearInterval(transcodeInterval);
          setJobStatus("completed");
          return 100;
        }
        
        const targetStep = transcodingSteps[currentStepIdx];
        if (targetStep && prev >= targetStep.pct) {
          setLogs(l => [...l, targetStep.log]);
          currentStepIdx++;
        }

        const next = prev + Math.floor(Math.random() * 8) + 2;
        return Math.min(next, 100);
      });
    }, 250);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative flex flex-col justify-between">
      {/* Background ambient radial glowing gradients */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[450px] max-w-4xl bg-[radial-gradient(ellipse_at_top,oklch(0.75_0.13_70/0.12),transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] bg-[radial-gradient(circle_at_bottom_right,oklch(0.75_0.13_70/0.05),transparent_70%)]" />
      
      <main className="mx-auto w-full max-w-6xl px-6 py-12 md:py-20 flex-1 z-10">
        {/* Page Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3 py-1 text-xs text-muted-foreground mb-4">
            <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" />
            <span>FFmpeg Web pipeline Sandbox</span>
          </div>
          <h1 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl">
            Transcode your media.
          </h1>
          <p className="mt-2 text-muted-foreground text-sm md:text-base max-w-xl">
            Upload raw footages, apply high-quality configurations, and experience blazing-fast cloud transcoding.
          </p>
        </div>

        {/* Upload Interface Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* Left Side: Drag & Drop Card */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-500 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                <span className="h-2 w-2 rounded-full bg-red-500 shrink-0 animate-pulse" />
                <span className="flex-1 font-medium">{error}</span>
                <button 
                  type="button"
                  onClick={() => setError(null)} 
                  className="text-red-500/70 hover:text-red-500 font-bold px-1 text-sm focus:outline-none"
                >
                  ✕
                </button>
              </div>
            )}
            <div 
              className={`relative overflow-hidden rounded-2xl border transition-all duration-300 flex-1 flex flex-col justify-center items-center p-8 min-h-[350px] cursor-pointer
                ${dragActive 
                  ? "border-amber-500 bg-amber-500/5 shadow-[0_0_25px_-5px_oklch(0.75_0.13_70/0.2)]" 
                  : "border-border bg-card/40 hover:bg-card/75 hover:border-foreground/30"
                }
              `}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={jobStatus === "idle" ? triggerFileInput : undefined}
            >
              {/* Decorative faint background grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.03] pointer-events-none" />

              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                accept="video/*"
                onChange={handleFileChange}
              />

              {jobStatus === "idle" && !selectedFile && (
                <div className="flex flex-col items-center text-center space-y-4 max-w-sm relative z-10 pointer-events-none">
                  <div className="h-14 w-14 rounded-full bg-muted/60 flex items-center justify-center border border-border/80 group-hover:scale-105 transition-transform duration-300">
                    <UploadCloud className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-xl">Drag your raw video here</h3>
                    <p className="text-sm text-muted-foreground">
                      or click to browse your local computer
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      Up to 100 MB file size allowed
                    </p>
                  </div>
                  <div className="pt-4 flex flex-wrap gap-2 justify-center text-[11px] text-muted-foreground/80 font-mono">
                    <span className="bg-muted px-2 py-0.5 rounded border border-border">.mp4</span>
                    <span className="bg-muted px-2 py-0.5 rounded border border-border">.mov</span>
                    <span className="bg-muted px-2 py-0.5 rounded border border-border">.webm</span>
                    <span className="bg-muted px-2 py-0.5 rounded border border-border">.mkv</span>
                    <span className="bg-muted px-2 py-0.5 rounded border border-border">.prores</span>
                  </div>
                </div>
              )}

              {/* Active Selection / Loading State */}
              {selectedFile && (
                <div className="w-full flex flex-col h-full justify-between space-y-6 relative z-10" onClick={e => e.stopPropagation()}>
                  
                  {/* File Information Card Header */}
                  <div className="flex items-start justify-between border-b border-border/60 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                        <FileVideo className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium text-base line-clamp-1 max-w-[250px] sm:max-w-md">{selectedFile.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatBytes(selectedFile.size)} · {selectedFile.type}
                        </p>
                      </div>
                    </div>
                    {jobStatus === "idle" && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={removeFile}
                        className="text-muted-foreground hover:text-red-500 rounded-full hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Active Simulation Steps */}
                  {jobStatus === "idle" && (
                    <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                      <div className="p-3 bg-muted/40 rounded-full animate-bounce">
                        <Play className="h-6 w-6 text-amber-500 fill-amber-500" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg">Ready to pipeline</h4>
                        <p className="text-xs text-muted-foreground max-w-xs mt-1">
                          Configure your compression options on the right side and click start.
                        </p>
                      </div>
                    </div>
                  )}

                  {(jobStatus === "uploading" || jobStatus === "transcoding") && (
                    <div className="py-6 space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-muted-foreground">
                            {jobStatus === "uploading" ? "Uploading Source Chunk..." : "Transcoding Streams..."}
                          </span>
                          <span className="text-foreground font-semibold">
                            {jobStatus === "uploading" ? `${uploadProgress}%` : `${transcodeProgress}%`}
                          </span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-500 transition-all duration-200 ease-out" 
                            style={{ width: `${jobStatus === "uploading" ? uploadProgress : transcodeProgress}%` }}
                          />
                        </div>
                      </div>

                      {/* Interactive console logs */}
                      <div className="rounded-xl border border-border/80 bg-black/60 p-4 font-mono text-[11px] leading-relaxed text-muted-foreground h-[180px] overflow-y-auto flex flex-col justify-start">
                        <div className="flex items-center justify-between border-b border-border/20 pb-2 mb-2">
                          <span className="text-[10px] uppercase tracking-widest text-amber-500 font-semibold">Worker Console Logs</span>
                          <RefreshCw className="h-3 w-3 animate-spin text-amber-500" />
                        </div>
                        <div className="space-y-1 select-text">
                          {logs.map((log, idx) => (
                             <div key={idx} className="flex gap-2">
                              <span className="text-muted-foreground/40 font-semibold">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}]</span>
                              <span className={log.startsWith("✓") ? "text-green-500" : log.startsWith("Starting") ? "text-amber-400" : "text-muted-foreground"}>{log}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {jobStatus === "completed" && (
                    <div className="py-8 text-center flex flex-col items-center justify-center space-y-5 animate-in fade-in-50 zoom-in-95 duration-500">
                      <div className="h-16 w-16 bg-green-500/10 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-2xl">Conversion Ready</h4>
                        <p className="text-sm text-muted-foreground max-w-sm">
                          Your file has been transcoded with preset <span className="text-foreground font-semibold font-mono">{selectedPreset}</span> and packaged into <span className="text-foreground font-semibold font-mono">{outputContainer}</span> structure.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-3">
                        <Button className="rounded-full px-6 py-2 bg-foreground text-background hover:bg-foreground/90">
                          Download Output File
                          <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Button>
                        <Button variant="ghost" onClick={removeFile} className="rounded-full px-6 py-2 border border-border">
                          Transcode Another
                        </Button>
                      </div>

                      <div className="text-[11px] text-muted-foreground/80 font-mono mt-4 pt-4 border-t border-border/40 w-full flex justify-between">
                        <span>Original Size: {formatBytes(selectedFile.size)}</span>
                        <span>Converted Size: {formatBytes(selectedFile.size * (selectedPreset === 'av1' ? 0.35 : selectedPreset === 'h265' ? 0.45 : 0.65))}</span>
                        <span className="text-green-500 font-semibold">Saved ~{Math.round((1 - (selectedPreset === 'av1' ? 0.35 : selectedPreset === 'h265' ? 0.45 : 0.65)) * 100)}%</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Simulated Live status updates banner */}
            <div className="rounded-xl border border-border bg-card/20 p-4 text-xs text-muted-foreground flex items-start gap-3">
              <Info className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Client-Side Compression Sandbox</p>
                <p className="mt-1 leading-normal">
                  All formatting processing is currently emulated in this view. Next versions will integrate with the `/api/upload-file` endpoint and local WebAssembly or backend transcoder nodes.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Options Config Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-card/60 p-6 space-y-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-border pb-4">
                <Settings2 className="h-5 w-5 text-amber-500" />
                <h2 className="font-serif text-xl">Job Configurations</h2>
              </div>

              {/* Preset Selector */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                  <span>Encoding Preset</span>
                  <Sliders className="h-3.5 w-3.5" />
                </label>
                <div className="space-y-2">
                  {PRESETS.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => jobStatus === "idle" && setSelectedPreset(p.id)}
                      className={`group border rounded-xl p-3 text-left cursor-pointer transition-all duration-200 select-none
                        ${selectedPreset === p.id 
                          ? "border-foreground bg-primary/5 shadow-sm" 
                          : "border-border/60 hover:border-border/100 hover:bg-card/90"
                        }
                        ${jobStatus !== "idle" ? "opacity-60 cursor-not-allowed" : ""}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{p.name}</span>
                        {selectedPreset === p.id && (
                          <div className="h-4 w-4 rounded-full bg-foreground flex items-center justify-center">
                            <Check className="h-2.5 w-2.5 text-background" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resolution selection checkboxes */}
              {selectedPreset !== "prores" && (
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Target Resolution Outputs
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {RESOLUTIONS.map((res) => {
                      const isSelected = selectedResolutions.includes(res.id);
                      return (
                        <button
                          key={res.id}
                          type="button"
                          disabled={jobStatus !== "idle"}
                          onClick={() => toggleResolution(res.id)}
                          className={`flex items-center justify-between p-3 rounded-lg border text-xs text-left transition-all duration-200 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                            ${isSelected 
                              ? "border-foreground/80 bg-foreground/5 font-medium" 
                              : "border-border/60 hover:border-border"
                            }
                          `}
                        >
                          <span>{res.name}</span>
                          <div className={`h-4.5 w-4.5 rounded border flex items-center justify-center transition-colors
                            ${isSelected 
                              ? "bg-foreground border-foreground text-background" 
                              : "border-border/80 bg-background"
                            }
                          `}>
                            {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Container Format Select Dropdown */}
              <div className="pt-4 border-t border-border/60 space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                  <span>Output Container</span>
                  <span className="text-[10px] text-amber-500 font-mono font-normal uppercase">Recommended for YouTube</span>
                </label>
                <Select
                  value={outputContainer}
                  onValueChange={(val) => {
                    if (jobStatus === "idle") {
                      setOutputContainer(val);
                      // Auto-update preset if mismatched
                      if (val === "m3u8" && selectedPreset !== "hls") {
                        setSelectedPreset("hls");
                      } else if (val === "webm" && selectedPreset === "prores") {
                        setSelectedPreset("av1");
                      } else if (val === "mov" && selectedPreset !== "prores") {
                        setSelectedPreset("prores");
                      } else if (val === "mp4" && (selectedPreset === "hls" || selectedPreset === "prores")) {
                        setSelectedPreset("h264");
                      }
                    }
                  }}
                  disabled={jobStatus !== "idle"}
                >
                  <SelectTrigger className="w-full justify-between bg-card text-foreground border-border hover:bg-card/85 hover:border-foreground/30 py-2 h-10 px-3 hover:cursor-pointer transition-colors rounded-xl">
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border shadow-md text-foreground rounded-xl z-50">
                    <SelectItem value="mp4" className="hover:cursor-pointer">MP4 (.mp4) — YouTube / Universal Web</SelectItem>
                    <SelectItem value="webm" className="hover:cursor-pointer">WebM (.webm) — Next-Gen Open Format</SelectItem>
                    <SelectItem value="m3u8" className="hover:cursor-pointer">HLS (.m3u8) — HTTP Live Adaptive Streaming</SelectItem>
                    <SelectItem value="mov" className="hover:cursor-pointer">MOV (.mov) — Apple QuickTime</SelectItem>
                    <SelectItem value="mkv" className="hover:cursor-pointer">MKV (.mkv) — Matroska Container</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Main pipeline Action Button */}
              {jobStatus === "idle" ? (
                <Button 
                  onClick={startMockPipeline}
                  disabled={!selectedFile}
                  className="w-full py-6 rounded-full hover:cursor-pointer hover:scale-[0.98] transition-all duration-300 ease-in-out text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Transcode Pipeline
                  <ArrowUpRight className="ml-1.5 h-4.5 w-4.5" />
                </Button>
              ) : (
                <Button 
                  disabled
                  className="w-full py-6 rounded-full bg-muted border border-border text-muted-foreground text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-4 w-4 animate-spin text-amber-500" />
                  {jobStatus === "uploading" ? "Uploading Video..." : jobStatus === "transcoding" ? "Encoding Layers..." : "Complete"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}


