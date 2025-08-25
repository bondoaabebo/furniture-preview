import { useEffect, useRef, useState } from "react"

function CameraPreview({ productImage, onClose }) {
  const videoRef = useRef(null)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [size, setSize] = useState(150)
  const [rotation, setRotation] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [initialPinchDistance, setInitialPinchDistance] = useState(null)
  const [initialAngle, setInitialAngle] = useState(null)
  const [initialSize, setInitialSize] = useState(size)
  const [initialRotation, setInitialRotation] = useState(rotation)

  useEffect(() => {
    let stream
    async function enableCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        })
        videoRef.current.srcObject = stream
      } catch (err) {
        console.warn("تعذر فتح الكاميرا الخلفية، فتحنا الافتراضية:", err)
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true })
          videoRef.current.srcObject = stream
        } catch (err2) {
          console.error("خطأ في تشغيل الكاميرا:", err2)
        }
      }
    }
    enableCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const handleMouseDown = (e) => {
    setDragging(true)
    const rect = e.target.getBoundingClientRect()
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleMouseMove = (e) => {
    if (dragging) {
      const videoRect = videoRef.current.getBoundingClientRect()
      const x = ((e.clientX - videoRect.left - offset.x) / videoRect.width) * 100
      const y = ((e.clientY - videoRect.top - offset.y) / videoRect.height) * 100
      setPosition({ x, y })
    }
  }

  const handleMouseUp = () => setDragging(false)

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const rect = e.target.getBoundingClientRect()
      setDragging(true)
      setOffset({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      })
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx) * (180 / Math.PI)

      setInitialPinchDistance(distance)
      setInitialSize(size)
      setInitialAngle(angle)
      setInitialRotation(rotation)
    }
  }

  const handleTouchMove = (e) => {
    const videoRect = videoRef.current.getBoundingClientRect()
    if (e.touches.length === 1 && dragging) {
      const x = ((e.touches[0].clientX - videoRect.left - offset.x) / videoRect.width) * 100
      const y = ((e.touches[0].clientY - videoRect.top - offset.y) / videoRect.height) * 100
      setPosition({ x, y })
    } else if (e.touches.length === 2 && initialPinchDistance && initialAngle !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const newDistance = Math.sqrt(dx * dx + dy * dy)
      const newAngle = Math.atan2(dy, dx) * (180 / Math.PI)

      const scale = newDistance / initialPinchDistance
      setSize(Math.max(50, initialSize * scale))

      const rotationDelta = newAngle - initialAngle
      setRotation(initialRotation + rotationDelta)
    }
  }

  const handleTouchEnd = () => {
    setDragging(false)
    setInitialPinchDistance(null)
    setInitialAngle(null)
  }

  const increaseSize = () => setSize((s) => s + 20)
  const decreaseSize = () => setSize((s) => Math.max(50, s - 20))
  const rotateLeft = () => setRotation((r) => r - 15)
  const rotateRight = () => setRotation((r) => r + 15)

  // ✨ استايل زر دائري شفاف
  const buttonStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer"
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#000",
        overflow: "hidden"
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* الكاميرا fullscreen */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />

      {/* صورة المنتج فوق الكاميرا */}
      {productImage && (
        <img
          src={productImage}
          alt="Product Overlay"
          style={{
            position: "absolute",
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            width: `${size}px`,
            cursor: "grab",
            opacity: 0.9,
            touchAction: "none"
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />
      )}

      {/* أزرار التحكم (دائرية) */}
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "15px"
        }}
      >
        <button onClick={increaseSize} style={buttonStyle}>＋</button>
        <button onClick={decreaseSize} style={buttonStyle}>－</button>
        <button onClick={rotateLeft} style={buttonStyle}>⟲</button>
        <button onClick={rotateRight} style={buttonStyle}>⟳</button>
        <button onClick={onClose} style={{ ...buttonStyle, background: "rgba(255,0,0,0.6)" }}>✕</button>
      </div>
    </div>
  )
}

export default CameraPreview
ew
