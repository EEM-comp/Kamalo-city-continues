export function generateTimeSlots(start: string, end: string): string[] {
  const slots: string[] = [];
  const startTime = new Date(`2024-01-01 ${start}`);
  const endTime = new Date(`2024-01-01 ${end}`);

  while (startTime < endTime) {
    slots.push(startTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }));
    startTime.setHours(startTime.getHours() + 1);
  }

  return slots;
}